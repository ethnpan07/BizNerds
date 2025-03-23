# backend/routes/order_routes.py
from flask import Blueprint, request, jsonify, session
from backend.models import db, Order

order_bp = Blueprint('order_bp', __name__)

@order_bp.route('/orders', methods=['GET'])
def get_orders():
    # If you want to ensure user is logged in
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    orders = Order.query.all()
    data = []
    for o in orders:
        data.append({
            'order_id': o.order_id,
            'account_id': o.account_id,
            'symbol': o.symbol,
            'order_type': o.order_type,
            'side': o.side,
            'quantity': o.quantity,
            'price': str(o.price),
            'status': o.status,
            'created_at': o.created_at.isoformat(),
            'filled_at': o.filled_at.isoformat() if o.filled_at else None
        })
    return jsonify(data), 200

@order_bp.route('/orders/<order_id>', methods=['GET'])
def get_order(order_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    order = Order.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    return jsonify({
        'order_id': order.order_id,
        'account_id': order.account_id,
        'symbol': order.symbol,
        'order_type': order.order_type,
        'side': order.side,
        'quantity': order.quantity,
        'price': str(order.price),
        'status': order.status,
        'created_at': order.created_at.isoformat(),
        'filled_at': order.filled_at.isoformat() if order.filled_at else None
    }), 200

@order_bp.route('/orders', methods=['POST'])
def create_order():
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    data = request.json
    # Validate input
    required_fields = ['account_id', 'symbol', 'order_type', 'side', 'quantity']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    new_order = Order(
        account_id=data['account_id'],
        symbol=data['symbol'],
        order_type=data['order_type'],
        side=data['side'],
        quantity=data['quantity'],
        price=data.get('price'),  # optional
        status='PENDING'
    )
    db.session.add(new_order)
    db.session.commit()

    return jsonify({'message': 'Order created', 'order_id': new_order.order_id}), 201

@order_bp.route('/orders/<order_id>', methods=['PUT'])
def update_order(order_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    order = Order.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    data = request.json
    # Update fields as needed
    if 'symbol' in data:
        order.symbol = data['symbol']
    if 'quantity' in data:
        order.quantity = data['quantity']
    if 'price' in data:
        order.price = data['price']
    if 'status' in data:
        order.status = data['status']
    if 'filled_at' in data:
        order.filled_at = data['filled_at']

    db.session.commit()
    return jsonify({'message': 'Order updated'}), 200

@order_bp.route('/orders/<order_id>', methods=['DELETE'])
def delete_order(order_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Not logged in'}), 401

    order = Order.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order deleted'}), 200
