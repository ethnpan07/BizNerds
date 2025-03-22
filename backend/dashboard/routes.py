from flask import Blueprint, request, jsonify, current_app
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import date
import requests
import json
from config import FIN_API_KEY
from utils.summarizer import summarize_text
from utils.stock_data import fetch_stock_data  # Assume this returns a dict including "description"

dashboard_bp = Blueprint('dashboard', __name__)
FMP_BASE = "https://financialmodelingprep.com/api/v3"

def build_plotly_figure_for(ticker, company_data):
    # Get historical prices
    start = f"{date.today().year}-01-01"
    resp = requests.get(
        f"{FMP_BASE}/historical-price-full/{ticker}",
        params={"from": start, "apikey": FIN_API_KEY},
        timeout=10
    ).json()
    df = pd.DataFrame(resp.get("historical", []))
    if not df.empty:
        df["date"] = pd.to_datetime(df["date"])
        df.sort_values("date", inplace=True)

    # Create Plotly figure
    fig = px.line(df, x="date", y="close", title=f"{ticker} YTD Closing Price")
    if fig.data:
        # Remove the default trace if you want (optional)
        fig.data = fig.data[1:]
    # Use company_data["price"] (not "currentPrice")
    fig.add_hline(
        y=company_data["price"],
        line_dash="dash",
        annotation_text=f"Current: ${company_data['price']:.2f}",
        annotation_position="top right",
        layer="above"
    )
    fig.add_trace(go.Scatter(
        x=df["date"],
        y=df["close"],
        mode="lines",
        name="Close",
        customdata=df[["open", "high", "low", "volume"]].values
    ))
    fig.update_layout(
        template="plotly_white",
        xaxis_title="Date",
        yaxis_title="Price (USD)",
        hovermode="x",
        xaxis=dict(
            showspikes=True,
            spikecolor="grey",
            spikethickness=1,
            spikedash="dash",
            spikemode="across"
        ),
        yaxis=dict(
            showspikes=True,
            spikecolor="grey",
            spikethickness=1,
            spikedash="dash",
            spikemode="across"
        ),
        margin=dict(l=40, r=40, t=60, b=40)
    )
    if fig.data:
        fig.data[-1].hovertemplate = (
            "<b>Date:</b> %{x|%-m/%d/%Y}<br>"
            "<b>Close:</b> %{y:$,.2f}<br>"
            "<b>Open:</b> %{customdata[0]:$,.2f}<br>"
            "<b>High:</b> %{customdata[1]:$,.2f}<br>"
            "<b>Low:</b> %{customdata[2]:$,.2f}<br>"
            "<b>Volume:</b> %{customdata[3]:,}<extra></extra>"
        )
    fig.update_traces(mode="lines+markers")
    return fig

def get_bottom_info(ticker):
    quote = requests.get(
        f"{FMP_BASE}/quote/{ticker}",
        params={"apikey": FIN_API_KEY},
        timeout=10
    ).json()[0]
    return {
        "Previous Close": quote.get("previousClose"),
        "Open": quote.get("open"),
        "Day's Range": f"{quote.get('dayLow')} - {quote.get('dayHigh')}",
        "52‑Week Range": f"{quote.get('yearLow')} - {quote.get('yearHigh')}",
        "Volume": f"{quote.get('volume'):,}",
        "Avg Volume": f"{quote.get('avgVolume'):,}",
        "PE Ratio (TTM)": quote.get("pe"),
        "EPS (TTM)": quote.get("eps"),
        "Earnings Date": quote.get("earningsAnnouncement")
    }

@dashboard_bp.route('/api/dashboard', methods=['GET'])
def dashboard_json():
    ticker = request.args.get("ticker", "").upper()
    if not ticker:
        return jsonify(error="Please provide a ticker symbol"), 400

    profile_raw = fetch_stock_data(ticker)
    if not profile_raw:
        return jsonify(error=f"Data not available for {ticker}"), 404

    # Generate a 1-2 sentence summary using the company's description
    description = profile_raw.get("description", "")
    summary_text = summarize_text(description)

    # Build company data
    company_data = {
        "ticker": profile_raw["symbol"],
        "companyName": profile_raw.get("companyName"),
        "price": profile_raw.get("price"),
        "marketCap": profile_raw.get("mktCap"),
        "sector": profile_raw.get("sector"),
        "industry": profile_raw.get("industry"),
        "ceo": profile_raw.get("ceo"),
        "website": profile_raw.get("website"),
        "image": profile_raw.get("image"),
        "ipoDate": profile_raw.get("ipoDate"),
        "summary": summary_text,
    }

    fig = build_plotly_figure_for(ticker, company_data)
    plot_dict = json.loads(fig.to_json())
    bottom_info = get_bottom_info(ticker)

    return jsonify({
        "company": company_data,
        "summary": summary_text,
        "plot": plot_dict,
        "bottom_info": bottom_info
    })

@dashboard_bp.route('/api/search', methods=['GET'])
def search_companies():
    q = request.args.get("q", "").strip()
    if not q:
        return jsonify([])
    resp = requests.get(
        f"{FMP_BASE}/search",
        params={"query": q, "limit": 10, "apikey": FIN_API_KEY},
        timeout=5
    ).json()

    results = []
    for c in resp:
        if isinstance(c, dict):
            # Use the image from response, or fallback to a standard URL.
            img = c.get("image")
            if not img:
                img = f"https://financialmodelingprep.com/image-stock/{c.get('symbol')}.png"
            results.append({
                "symbol": c.get("symbol"),
                "name": c.get("name"),
                "image": img
            })
        else:
            # c is a string; assume it is the ticker.
            results.append({
                "symbol": c,
                "name": c,
                "image": f"https://financialmodelingprep.com/image-stock/{c}.png"
            })
    return jsonify(results)





# from flask import Blueprint, render_template, request
# import pandas as pd
# import plotly.express as px
# import plotly.graph_objects as go
# from datetime import date
# import requests
# import json
# from flask import jsonify
# from config import FIN_API_KEY
# from utils.summarizer import summarize_text
# from utils.stock_data import fetch_stock_data, summarize_with_llm

# dashboard_bp = Blueprint('dashboard', __name__)
# FMP_BASE = "https://financialmodelingprep.com/api/v3"

# @dashboard_bp.route('/')
# def index():
#     return render_template("index.html")

# @dashboard_bp.route('/dashboard', methods=['GET'])
# def dashboard():
#     ticker = request.args.get("ticker", "").upper()
#     if not ticker:
#         return "Please provide a ticker symbol", 400

#     # Fetch profile data and create a summary
#     profile_raw = fetch_stock_data(ticker)
#     if not profile_raw:
#         return f"Data not available for {ticker}", 404

#     company_data = {
#         "ticker": profile_raw["symbol"],
#         "companyName": profile_raw.get("companyName"),
#         "currentPrice": profile_raw.get("price"),
#         "marketCap": profile_raw.get("mktCap")
#     }
#     summary = summarize_with_llm(company_data)

#     # Get historical prices and build a line chart with Plotly
#     start = f"{date.today().year}-01-01"
#     resp = requests.get(f"{FMP_BASE}/historical-price-full/{ticker}",
#                         params={"from": start, "apikey": FIN_API_KEY}, timeout=10).json()
#     df = pd.DataFrame(resp.get("historical", []))
#     if not df.empty:
#         df["date"] = pd.to_datetime(df["date"])
#         df.sort_values("date", inplace=True)

#     fig = px.line(df, x="date", y="close", title=f"{ticker} YTD Closing Price")
#     if fig.data:
#         fig.data = fig.data[1:]
#     fig.add_hline(
#         y=company_data["currentPrice"],
#         line_dash="dash",
#         annotation_text=f"Current: ${company_data['currentPrice']:.2f}",
#         annotation_position="top right",
#         layer="above"
#     )
#     fig.add_trace(go.Scatter(
#         x=df["date"],
#         y=df["close"],
#         mode="lines",
#         name="Close",
#         customdata=df[["open", "high", "low", "volume"]].values
#     ))
#     fig.update_layout(
#         template="plotly_white",
#         xaxis_title="Date",
#         yaxis_title="Price (USD)",
#         hovermode="x",
#         xaxis=dict(
#             showspikes=True,
#             spikecolor="grey",
#             spikethickness=1,
#             spikedash="dash",
#             spikemode="across"
#         ),
#         yaxis=dict(
#             showspikes=True,
#             spikecolor="grey",
#             spikethickness=1,
#             spikedash="dash",
#             spikemode="across"
#         ),
#         margin=dict(l=40, r=40, t=60, b=40)
#     )
#     if fig.data:
#         fig.data[-1].hovertemplate = (
#             "<b>Date:</b> %{x|%-m/%d/%Y}<br>"
#             "<b>Close:</b> %{y:$,.2f}<br>"
#             "<b>Open:</b> %{customdata[0]:$,.2f}<br>"
#             "<b>High:</b> %{customdata[1]:$,.2f}<br>"
#             "<b>Low:</b> %{customdata[2]:$,.2f}<br>"
#             "<b>Volume:</b> %{customdata[3]:,}<extra></extra>"
#         )
#     fig.update_traces(mode="lines+markers")
#     #plot_div = fig.to_html(full_html=False)

#     # Get additional quote information
#     quote = requests.get(f"{FMP_BASE}/quote/{ticker}",
#                          params={"apikey": FIN_API_KEY}, timeout=10).json()[0]
#     bottom_info = {
#         "Previous Close": quote.get("previousClose"),
#         "Open": quote.get("open"),
#         "Day's Range": f"{quote.get('dayLow')} - {quote.get('dayHigh')}",
#         "52‑Week Range": f"{quote.get('yearLow')} - {quote.get('yearHigh')}",
#         "Volume": f"{quote.get('volume'):,}",
#         "Avg Volume": f"{quote.get('avgVolume'):,}",
#         "PE Ratio (TTM)": quote.get("pe"),
#         "EPS (TTM)": quote.get("eps"),
#         "Earnings Date": quote.get("earningsAnnouncement")
#     }

#     # return render_template("dashboard.html",
#     #                        company_data=company_data,
#     #                        profile_raw=profile_raw,
#     #                        summary=summary,
#     #                        plot_div=plot_div,
#     #                        bottom_info=bottom_info)
#     plot_dict = json.loads(fig.to_json())
#     return jsonify({
#         "company": company_data,
#         "summary": summary,
#         "plot": plot_dict,      # <-- send Plotly figure as JSON
#         "bottom_info": bottom_info
#     })

# @dashboard_bp.route('/api/dashboard', methods=['GET'])
# def dashboard_json():
#     ticker = request.args.get("ticker", "").upper()
#     if not ticker:
#         return "Please provide a ticker symbol", 400

#     # Fetch profile data and create a summary
#     profile_raw = fetch_stock_data(ticker)
#     if not profile_raw:
#         return f"Data not available for {ticker}", 404
        
#     description = profile_raw.get("description", "")
#     summary = summarize_text(description)

#     company_data = {
#         "ticker": profile_raw["symbol"],
#         "companyName": profile_raw.get("companyName"),
#         "price": profile_raw.get("price"),
#         "marketCap": profile_raw.get("mktCap"),
#         "sector": profile_raw.get("sector"),
#         "industry": profile_raw.get("industry"),
#         "ceo": profile_raw.get("ceo"),
#         "website": profile_raw.get("website"),
#         "image": profile_raw.get("image"),
#         "ipoDate": profile_raw.get("ipoDate"),
#         "summary": summary,
#     }
#     # company_data = {
#     #     "ticker": profile_raw["symbol"],
#     #     "companyName": profile_raw.get("companyName"),
#     #     "currentPrice": profile_raw.get("price"),
#     #     "marketCap": profile_raw.get("mktCap")
#     # }
#     # summary = summarize_with_llm(company_data)

#     # Get historical prices and build a line chart with Plotly
#     start = f"{date.today().year}-01-01"
#     resp = requests.get(f"{FMP_BASE}/historical-price-full/{ticker}",
#                         params={"from": start, "apikey": FIN_API_KEY}, timeout=10).json()
#     df = pd.DataFrame(resp.get("historical", []))
#     if not df.empty:
#         df["date"] = pd.to_datetime(df["date"])
#         df.sort_values("date", inplace=True)

#     fig = px.line(df, x="date", y="close", title=f"{ticker} YTD Closing Price")
#     if fig.data:
#         fig.data = fig.data[1:]
#     fig.add_hline(
#         y=company_data["currentPrice"],
#         line_dash="dash",
#         annotation_text=f"Current: ${company_data['currentPrice']:.2f}",
#         annotation_position="top right",
#         layer="above"
#     )
#     fig.add_trace(go.Scatter(
#         x=df["date"],
#         y=df["close"],
#         mode="lines",
#         name="Close",
#         customdata=df[["open", "high", "low", "volume"]].values
#     ))
#     fig.update_layout(
#         template="plotly_white",
#         xaxis_title="Date",
#         yaxis_title="Price (USD)",
#         hovermode="x",
#         xaxis=dict(
#             showspikes=True,
#             spikecolor="grey",
#             spikethickness=1,
#             spikedash="dash",
#             spikemode="across"
#         ),
#         yaxis=dict(
#             showspikes=True,
#             spikecolor="grey",
#             spikethickness=1,
#             spikedash="dash",
#             spikemode="across"
#         ),
#         margin=dict(l=40, r=40, t=60, b=40)
#     )
#     if fig.data:
#         fig.data[-1].hovertemplate = (
#             "<b>Date:</b> %{x|%-m/%d/%Y}<br>"
#             "<b>Close:</b> %{y:$,.2f}<br>"
#             "<b>Open:</b> %{customdata[0]:$,.2f}<br>"
#             "<b>High:</b> %{customdata[1]:$,.2f}<br>"
#             "<b>Low:</b> %{customdata[2]:$,.2f}<br>"
#             "<b>Volume:</b> %{customdata[3]:,}<extra></extra>"
#         )
#     fig.update_traces(mode="lines+markers")
#     #plot_div = fig.to_html(full_html=False)

#     # Get additional quote information
#     quote = requests.get(f"{FMP_BASE}/quote/{ticker}",
#                          params={"apikey": FIN_API_KEY}, timeout=10).json()[0]
#     bottom_info = {
#         "Previous Close": quote.get("previousClose"),
#         "Open": quote.get("open"),
#         "Day's Range": f"{quote.get('dayLow')} - {quote.get('dayHigh')}",
#         "52‑Week Range": f"{quote.get('yearLow')} - {quote.get('yearHigh')}",
#         "Volume": f"{quote.get('volume'):,}",
#         "Avg Volume": f"{quote.get('avgVolume'):,}",
#         "PE Ratio (TTM)": quote.get("pe"),
#         "EPS (TTM)": quote.get("eps"),
#         "Earnings Date": quote.get("earningsAnnouncement")
#     }

#     # return render_template("dashboard.html",
#     #                        company_data=company_data,
#     #                        profile_raw=profile_raw,
#     #                        summary=summary,
#     #                        plot_div=plot_div,
#     #                        bottom_info=bottom_info)
#     plot_dict = json.loads(fig.to_json())
#     return jsonify({
#         "company": company_data,
#         "summary": summary,
#         "plot": plot_dict,      # <-- send Plotly figure as JSON
#         "bottom_info": bottom_info
#     })
