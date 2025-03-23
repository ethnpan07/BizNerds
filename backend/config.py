import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'paper_trading.db')}"
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-change-me")
FIN_API_KEY = os.getenv("FIN_API_KEY")  # Make sure to set this in your environment
