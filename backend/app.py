from flask import Flask
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


def create_app():
    app = Flask(__name__)
    
    # Required for session cookies:
    app.config['SECRET_KEY'] = 'CHANGE_THIS_SECRET'
    
    # SQLAlchemy config:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:pass@localhost/mydb'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    # Register blueprints
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
