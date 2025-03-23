# # backend/__init__.py
# from flask import Flask
# from backend.config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS, SECRET_KEY
# from backend.models import db
# from backend.routes import register_routes  # your function that registers all blueprints

# def create_app():
#     app = Flask(__name__, static_folder="static", template_folder="templates")
#     app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
#     app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = SQLALCHEMY_TRACK_MODIFICATIONS
#     app.config["SECRET_KEY"] = SECRET_KEY

#     db.init_app(app)
#     with app.app_context():
#         db.create_all()
#     register_routes(app)
#     return app

# import os
# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy

# # Get the absolute path of the project root (parent of the "backend" folder)
# PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
# PROJECT_ROOT = os.path.dirname(PROJECT_ROOT)  # go up one level

# # Define paths for templates and static folders
# TEMPLATE_FOLDER = os.path.join(PROJECT_ROOT, "templates")
# STATIC_FOLDER = os.path.join(PROJECT_ROOT, "static")

# # Configuration
# SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(PROJECT_ROOT, "paper_trading.db")
# SQLALCHEMY_TRACK_MODIFICATIONS = False
# SECRET_KEY = "super-secret-change-me"

# db = SQLAlchemy()

# def create_app():
#     app = Flask(__name__, template_folder=TEMPLATE_FOLDER, static_folder=STATIC_FOLDER)
#     print("Template folder is:", app.template_folder)
#     print("Static folder is:", app.static_folder)

#     app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
#     app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = SQLALCHEMY_TRACK_MODIFICATIONS
#     app.config["SECRET_KEY"] = SECRET_KEY

#     db.init_app(app)
    
#     # Register blueprints
#     from backend.dashboard.routes import dashboard_bp
#     app.register_blueprint(dashboard_bp)
    
#     return app
