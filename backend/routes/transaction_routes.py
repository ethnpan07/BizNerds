# backend/routes/transaction_routes.py
from flask import Blueprint, request, jsonify, session
from backend.models import db, Transaction

transaction_bp = Blueprint('transaction_bp', __name__)

@transaction_bp.route('/transactions', methods=['GET'])
def get_transactions():
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    transactions = Transaction.query.all()
    data = []
    for t in transactions:
        data.append({
            'transaction_id': t.transaction_id,
            'account_id': t.account_id,
            'trade_id': t.trade_id,
            'amount': str(t.amount),
            'balance_after': str(t.balance_after),
            'timestamp': t.timestamp.isoformat()
        })
    return jsonify(data), 200

@transaction_bp.route('/transactions/<transaction_id>', methods=['GET'])
def get_transaction(transaction_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    transaction = Transaction.query.get(transaction_id)
    if not transaction:
        return jsonify({'error': 'Transaction not found'}), 404

    return jsonify({
        'transaction_id': transaction.transaction_id,
        'account_id': transaction.account_id,
        'trade_id': transaction.trade_id,
        'amount': str(transaction.amount),
        'balance_after': str(transaction.balance_after),
        'timestamp': transaction.timestamp.isoformat()
    }), 200

@transaction_bp.route('/transactions', methods=['POST'])
def create_transaction():
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    data = request.json
    required_fields = ['account_id', 'trade_id', 'amount', 'balance_after']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing {field}'}), 400

    new_tx = Transaction(
        account_id=data['account_id'],
        trade_id=data['trade_id'],
        amount=data['amount'],
        balance_after=data['balance_after']
    )
    db.session.add(new_tx)
    db.session.commit()

    return jsonify({'message': 'Transaction created', 'transaction_id': new_tx.transaction_id}), 201

@transaction_bp.route('/transactions/<transaction_id>', methods=['PUT'])
def update_transaction(transaction_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    transaction = Transaction.query.get(transaction_id)
    if not transaction:
        return jsonify({'error': 'Transaction not found'}), 404

    data = request.json
    if 'amount' in data:
        transaction.amount = data['amount']
    if 'balance_after' in data:
        transaction.balance_after = data['balance_after']

    db.session.commit()
    return jsonify({'message': 'Transaction updated'}), 200

@transaction_bp.route('/transactions/<transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    transaction = Transaction.query.get(transaction_id)
    if not transaction:
        return jsonify({'error': 'Transaction not found'}), 404

    db.session.delete(transaction)
    db.session.commit()
    return jsonify({'message': 'Transaction deleted'}), 200
