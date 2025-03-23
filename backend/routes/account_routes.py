from flask import Blueprint, request, jsonify
from models import db, Account

account_bp = Blueprint('account_bp', __name__)

@account_bp.route('/accounts', methods=['GET'])
def get_accounts():
    accounts = Account.query.all()
    return jsonify([
        {
            'account_id': acc.account_id,
            'user_id': acc.user_id,
            'currency': acc.currency,
            'cash_balance': str(acc.cash_balance),
            'created_at': acc.created_at.isoformat()
        }
        for acc in accounts
    ])

# And so on: GET single, POST create, PUT update, DELETE, etc.
