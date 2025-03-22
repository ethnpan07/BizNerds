import requests
import pandas as pd
from config import FIN_API_KEY

FMP_BASE = "https://financialmodelingprep.com/api/v3"

def fetch_stock_data(ticker):
    resp = requests.get(f"{FMP_BASE}/profile/{ticker}",
                        params={"apikey": FIN_API_KEY}, timeout=10)
    if resp.status_code != 200:
        return None
    data = resp.json()
    return data[0] if data else None

def summarize_with_llm(profile):
    return f"{profile.get('companyName')} ({profile.get('symbol')}) — current price ${profile.get('price')}"

def fetch_historical_prices(ticker, start_date):
    url = f"{FMP_BASE}/historical-price-full/{ticker}"
    params = {"from": start_date, "apikey": FIN_API_KEY}
    resp = requests.get(url, params=params, timeout=10)
    data = resp.json().get("historical", [])
    return pd.DataFrame(data).sort_values("date") if data else None
