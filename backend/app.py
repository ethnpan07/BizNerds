from flask import Flask
from flask_cors import CORS
from models import db
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.account_routes import account_bp
from routes.order_routes import order_bp
from routes.trade_routes import trade_bp
from routes.position_routes import position_bp
from routes.transaction_routes import transaction_bp
from dashboard.routes import dashboard_bp
from recommendations.routes import recommendations_bp
import os
from config import BASE_DIR, SECRET_KEY

def create_app():
    app = Flask(__name__)
    
    CORS(app, supports_credentials=True)  # Enable CORS

    app.config['SECRET_KEY'] = SECRET_KEY
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(BASE_DIR, 'paper_trading.db')}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(account_bp)
    app.register_blueprint(order_bp)
    app.register_blueprint(trade_bp)
    app.register_blueprint(position_bp)
    app.register_blueprint(transaction_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(recommendations_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
