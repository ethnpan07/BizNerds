from flask import Blueprint, render_template
import requests
from config import FIN_API_KEY
from utils.survey import load_survey_data, fuse_data, get_recommendations, generate_ai_signals_fmp, fetch_company_profiles

recommendations_bp = Blueprint('recommendations', __name__)

@recommendations_bp.route('/recommendations', methods=['GET'])
def recommendations():
    # Load user survey data
    survey = load_survey_data()


    # Fetch up to 100 tickers with positive 7‑day returns
    resp = requests.get(
        "https://financialmodelingprep.com/api/v3/stock_market/gainers",
        params={"apikey": FIN_API_KEY, "limit": 100},
        timeout=10
    ).json()
    # print("DEBUG: resp type:", type(resp))
    # print("DEBUG: resp content:", resp)

    valid_tickers = [stock["symbol"] for stock in resp]
    print("Total tickers with positive 21-day returns", len(valid_tickers))

    # Calculate AI momentum signals (30‑day returns)
    signals = generate_ai_signals_fmp(valid_tickers, FIN_API_KEY, period=21)
    positive = signals[signals["ai_score"] > 0]
    print("Positive 21‑day momentum tickers:", positive)

    if signals.empty:
        return render_template("recommendations.html", recommendations="<p>No signals available</p>")

    # Fetch company profile metadata
    profiles = fetch_company_profiles(valid_tickers, FIN_API_KEY)

    # Merge, fuse with survey data, and rank recommendations
    fused = fuse_data(survey, signals.merge(profiles, on="ticker", how="left"))
    recs = get_recommendations(fused, top_n=10)

    # Render as an HTML table
    recs_html = recs.to_html(classes="table table-striped", index=False)
    return render_template("recommendations.html", recommendations=recs_html)
