# backend/routes/position_routes.py
from flask import Blueprint, request, jsonify, session
from models import db, Position

position_bp = Blueprint('position_bp', __name__)

@position_bp.route('/positions', methods=['GET'])
def get_positions():
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    positions = Position.query.all()
    data = []
    for p in positions:
        data.append({
            'position_id': p.position_id,
            'portfolio_id': p.portfolio_id,
            'symbol': p.symbol,
            'quantity': p.quantity,
            'avg_cost': str(p.avg_cost),
            'updated_at': p.updated_at.isoformat()
        })
    return jsonify(data), 200

@position_bp.route('/positions/<position_id>', methods=['GET'])
def get_position(position_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    position = Position.query.get(position_id)
    if not position:
        return jsonify({'error': 'Position not found'}), 404

    return jsonify({
        'position_id': position.position_id,
        'portfolio_id': position.portfolio_id,
        'symbol': position.symbol,
        'quantity': position.quantity,
        'avg_cost': str(position.avg_cost),
        'updated_at': position.updated_at.isoformat()
    }), 200

@position_bp.route('/positions', methods=['POST'])
def create_position():
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    data = request.json
    required_fields = ['portfolio_id', 'symbol', 'quantity', 'avg_cost']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing {field}'}), 400

    new_pos = Position(
        portfolio_id=data['portfolio_id'],
        symbol=data['symbol'],
        quantity=data['quantity'],
        avg_cost=data['avg_cost']
    )
    db.session.add(new_pos)
    db.session.commit()

    return jsonify({'message': 'Position created', 'position_id': new_pos.position_id}), 201

@position_bp.route('/positions/<position_id>', methods=['PUT'])
def update_position(position_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    position = Position.query.get(position_id)
    if not position:
        return jsonify({'error': 'Position not found'}), 404

    data = request.json
    if 'quantity' in data:
        position.quantity = data['quantity']
    if 'avg_cost' in data:
        position.avg_cost = data['avg_cost']

    db.session.commit()
    return jsonify({'message': 'Position updated'}), 200

@position_bp.route('/positions/<position_id>', methods=['DELETE'])
def delete_position(position_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    position = Position.query.get(position_id)
    if not position:
        return jsonify({'error': 'Position not found'}), 404

    db.session.delete(position)
    db.session.commit()
    return jsonify({'message': 'Position deleted'}), 200
