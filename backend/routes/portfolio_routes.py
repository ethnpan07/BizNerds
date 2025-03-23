# backend/routes/portfolio_routes.py
from flask import Blueprint, request, jsonify, session
from backend.models import db, Portfolio

portfolio_bp = Blueprint('portfolio_bp', __name__)

@portfolio_bp.route('/portfolios', methods=['GET'])
def get_portfolios():
    # Check login
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    # Possibly join with account to ensure correct user
    portfolios = Portfolio.query.all()
    return jsonify([
        {
            'portfolio_id': p.portfolio_id,
            'account_id': p.account_id,
            'name': p.name
        } for p in portfolios
    ]), 200

# etc. CREATE, UPDATE, DELETE 
