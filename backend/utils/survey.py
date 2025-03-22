import pandas as pd
import requests
from itertools import product


DEFAULT_SURVEY = pd.DataFrame({
    "user_id": ["U001", "U002"],
    "risk_tolerance": ["low", "high"],
    "investment_horizon": ["long", "short"],
    "sector_preference": ["tech", "healthcare"]
})

risk_map = {"low": 0.2, "medium": 0.5, "high": 1.0}
horizon_map = {"short": 1, "medium": 2, "long": 3}

def load_survey_data(filepath=None):
    if filepath:
        try:
            survey = pd.read_csv(filepath)
        except Exception as e:
            print("Error loading file, using default data.", e)
            survey = DEFAULT_SURVEY.copy()
    else:
        survey = DEFAULT_SURVEY.copy()
    survey["risk_score"] = survey["risk_tolerance"].map(risk_map)
    survey["horizon_score"] = survey["investment_horizon"].map(horizon_map)
    return survey

def fuse_data(survey, signals):
    user_ticker = pd.DataFrame(list(product(survey["user_id"], signals["ticker"])),
                                columns=["user_id", "ticker"])
    df = user_ticker.merge(survey, on="user_id").merge(signals, on="ticker")
    df["personal_score"] = df["ai_score"] * df["risk_score"]
    return df

# def get_recommendations(fused_data, top_n=3):
#     recs = (fused_data[fused_data["personal_score"] > 0]
#             .sort_values(["user_id", "personal_score"], ascending=[True, False])
#             .groupby("user_id")
#             .head(top_n)
#             .reset_index(drop=True))
#     return recs

def get_recommendations(fused_data, top_n=3):
    # Filter for >0 only if any exist
    if (fused_data["personal_score"] > 0).any():
        df = fused_data[fused_data["personal_score"] > 0]
    else:
        df = fused_data.copy()

    return (
        df
        .sort_values(["user_id", "personal_score"], ascending=[True, False])
        .groupby("user_id")
        .head(top_n)
        .reset_index(drop=True)
    )


# def generate_ai_signals_fmp(tickers, fin_api_key, fmp_base="https://financialmodelingprep.com/api/v3"):
#     signals = []
#     for t in tickers:
#         url = f"{fmp_base}/historical-price-full/{t}?apikey={fin_api_key}&serietype=line"
#         resp = requests.get(url, timeout=10).json()
#         print(f"{t} → keys: {resp.keys()} | #historical: {len(resp.get('historical', []))}")

#         prices = resp.get("historical", [])
#         if prices:
#             df = pd.DataFrame(prices)[["date", "close"]]
#             df["date"] = pd.to_datetime(df["date"])
#             df.set_index("date", inplace=True)
#             if df.shape[0] >= 30:
#                 ret30 = df["close"].iloc[-1] / df["close"].iloc[-30] - 1
#                 signals.append({"ticker": t, "ai_score": ret30})
#     return pd.DataFrame(signals)

# def generate_ai_signals_fmp(tickers, fin_api_key, fmp_base="https://financialmodelingprep.com/api/v3"):
#     tickers_str = ",".join(tickers)
#     url = f"{fmp_base}/historical-price-full/{tickers_str}?apikey={fin_api_key}&serietype=line"
#     resp = requests.get(url, timeout=10).json()
#     signals = []
    
#     # The API may return a list of objects (one per ticker) or a single object.
#     if isinstance(resp, list):
#         for item in resp:
#             ticker = item.get("symbol")
#             print(f"{item} → keys: {resp.keys()} | #historical: {len(resp.get('historical', []))}")
#             prices = item.get("historical", [])
#             if prices and len(prices) >= 30:
#                 df = pd.DataFrame(prices)[["date", "close"]]
#                 df["date"] = pd.to_datetime(df["date"])
#                 df.sort_values("date", inplace=True)
#                 # Calculate 30-day return: using the oldest 30th day and the most recent day.
#                 ret30 = df["close"].iloc[-1] / df["close"].iloc[-30] - 1
#                 signals.append({"ticker": ticker, "ai_score": ret30})
#     else:
#         ticker = resp.get("symbol")
#         prices = resp.get("historical", [])
#         if prices and len(prices) >= 30:
#             df = pd.DataFrame(prices)[["date", "close"]]
#             df["date"] = pd.to_datetime(df["date"])
#             df.sort_values("date", inplace=True)
#             ret30 = df["close"].iloc[-1] / df["close"].iloc[-30] - 1
#             signals.append({"ticker": ticker, "ai_score": ret30})
    
#     return pd.DataFrame(signals)
# def generate_ai_signals_fmp(tickers, fin_api_key, fmp_base="https://financialmodelingprep.com/api/v3"):
#     tickers_str = ",".join(tickers)
#     url = f"{fmp_base}/historical-price-full/{tickers_str}"
#     resp = requests.get(url, params={"apikey": fin_api_key, "serietype": "line"}, timeout=10).json()

#     # Debug: print the structure of the raw JSON
#     import json
#     print("FMP raw JSON:", json.dumps(resp, indent=2)[:500])
    
#     # Extract the list from the "historicalStockList" key
#     items = resp.get("historicalStockList", [])
    
#     signals = []
#     for item in items:
#         ticker = item.get("symbol")
#         prices = item.get("historical", [])
#         if len(prices) >= 30:
#             df = pd.DataFrame(prices)[["date", "close"]]
#             df["date"] = pd.to_datetime(df["date"])
#             df.sort_values("date", inplace=True)
#             # Calculate 30-day return: using the oldest 30th day and the most recent day.
#             ret30 = df["close"].iloc[-1] / df["close"].iloc[-30] - 1
#             signals.append({"ticker": ticker, "ai_score": ret30})
#         print([item.get("symbol") for item in resp.get("historicalStockList", [])])

    
#     return pd.DataFrame(signals)

def generate_ai_signals_fmp(tickers, fin_api_key, period=7, fmp_base="https://financialmodelingprep.com/api/v3"):
    tickers_str = ",".join(tickers)
    resp = requests.get(
        f"{fmp_base}/historical-price-full/{tickers_str}",
        params={"apikey": fin_api_key, "serietype": "line"},
        timeout=10
    ).json()

    items = resp.get("historicalStockList", [])
    signals = []

    for item in items:
        prices = item.get("historical", [])
        if len(prices) >= period:
            df = pd.DataFrame(prices)[["date", "close"]]
            df["date"] = pd.to_datetime(df["date"])
            df.sort_values("date", inplace=True)
            ret = df["close"].iloc[-1] / df["close"].iloc[-period] - 1
            signals.append({"ticker": item["symbol"], "ai_score": ret})

    #print("Historical payload:", resp)

    return pd.DataFrame(signals)


def fetch_company_profiles(tickers, fin_api_key, fmp_base="https://financialmodelingprep.com/api/v3"):
    tickers_str = ",".join(tickers)
    url = f"{fmp_base}/profile/{tickers_str}?apikey={fin_api_key}"
    resp = requests.get(url, timeout=10).json()
    profiles = []
    for p in resp:
        if isinstance(p, dict):
            profiles.append({
                "ticker": p.get("symbol"),
                "company_name": p.get("companyName")
            })
    return pd.DataFrame(profiles)
