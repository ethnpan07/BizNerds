from flask import Blueprint, request, jsonify
from models import db, User, generate_uuid

user_bp = Blueprint('user_bp', __name__)

# GET all users
@user_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    # Convert to dict or JSON-serializable format
    results = []
    for u in users:
        results.append({
            'user_id': u.user_id,
            'email': u.email,
            'created_at': u.created_at.isoformat(),
            # Don't return password hash publicly!
        })
    return jsonify(results), 200

# GET single user
@user_bp.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({
        'user_id': user.user_id,
        'email': user.email,
        'created_at': user.created_at.isoformat(),
    }), 200

# CREATE a new user
@user_bp.route('/users', methods=['POST'])
def create_user():
    data = request.json  # or request.form for form data
    # Basic validation here
    if 'email' not in data or 'password_hash' not in data:
        return jsonify({'error': 'Email and password required'}), 400

    new_user = User(
        user_id=generate_uuid(),
        email=data['email'],
        password_hash=data['password_hash']
        # e.g. hash the password in a real app
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created', 'user_id': new_user.user_id}), 201

# UPDATE user
@user_bp.route('/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    data = request.json
    if 'email' in data:
        user.email = data['email']
    if 'password_hash' in data:
        user.password_hash = data['password_hash']
    db.session.commit()
    return jsonify({'message': 'User updated'}), 200

# DELETE user
@user_bp.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'}), 200
