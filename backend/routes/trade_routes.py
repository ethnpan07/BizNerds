# backend/routes/trade_routes.py
from flask import Blueprint, request, jsonify, session
from backend.models import db, Trade

trade_bp = Blueprint('trade_bp', __name__)

@trade_bp.route('/trades', methods=['GET'])
def get_trades():
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    trades = Trade.query.all()
    data = []
    for t in trades:
        data.append({
            'trade_id': t.trade_id,
            'order_id': t.order_id,
            'executed_price': str(t.executed_price),
            'executed_qty': t.executed_qty,
            'executed_at': t.executed_at.isoformat()
        })
    return jsonify(data), 200

@trade_bp.route('/trades/<trade_id>', methods=['GET'])
def get_trade(trade_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    trade = Trade.query.get(trade_id)
    if not trade:
        return jsonify({'error': 'Trade not found'}), 404

    return jsonify({
        'trade_id': trade.trade_id,
        'order_id': trade.order_id,
        'executed_price': str(trade.executed_price),
        'executed_qty': trade.executed_qty,
        'executed_at': trade.executed_at.isoformat()
    }), 200

@trade_bp.route('/trades', methods=['POST'])
def create_trade():
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    data = request.json
    required_fields = ['order_id', 'executed_price', 'executed_qty']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing {field}'}), 400

    new_trade = Trade(
        order_id=data['order_id'],
        executed_price=data['executed_price'],
        executed_qty=data['executed_qty']
    )
    db.session.add(new_trade)
    db.session.commit()

    return jsonify({'message': 'Trade created', 'trade_id': new_trade.trade_id}), 201

@trade_bp.route('/trades/<trade_id>', methods=['PUT'])
def update_trade(trade_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    trade = Trade.query.get(trade_id)
    if not trade:
        return jsonify({'error': 'Trade not found'}), 404

    data = request.json
    if 'executed_price' in data:
        trade.executed_price = data['executed_price']
    if 'executed_qty' in data:
        trade.executed_qty = data['executed_qty']
    if 'executed_at' in data:
        trade.executed_at = data['executed_at']

    db.session.commit()
    return jsonify({'message': 'Trade updated'}), 200

@trade_bp.route('/trades/<trade_id>', methods=['DELETE'])
def delete_trade(trade_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    trade = Trade.query.get(trade_id)
    if not trade:
        return jsonify({'error': 'Trade not found'}), 404

    db.session.delete(trade)
    db.session.commit()
    return jsonify({'message': 'Trade deleted'}), 200
