# backend/routes/auth_routes.py
from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash

from models import db, User, generate_uuid

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    if not data:
        return jsonify({'error': 'Missing JSON payload'}), 400

    email = data.get('email')
    password = data.get('password')
    
    # Basic validations
    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400

    # Check if email already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email already in use'}), 409

    hashed_pw = generate_password_hash(password)
    new_user = User(
        user_id=generate_uuid(),
        email=email,
        password_hash=hashed_pw
    )
    db.session.add(new_user)
    db.session.commit()

    # Optionally auto-log them in by setting session
    session['user_id'] = new_user.user_id
    return jsonify({'message': 'User created', 'user_id': new_user.user_id}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'Invalid email or password'}), 401

    if not check_password_hash(user.password_hash, password):
        return jsonify({'error': 'Invalid email or password'}), 401

    # Store user_id in session to mark them as "logged in"
    session['user_id'] = user.user_id

    return jsonify({'message': 'Logged in successfully', 'user_id': user.user_id}), 200

@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out'}), 200

# Optional: endpoint to check if user is logged in
@auth_bp.route('/check_session', methods=['GET'])
def check_session():
    if 'user_id' in session:
        return jsonify({'logged_in': True, 'user_id': session['user_id']}), 200
    else:
        return jsonify({'logged_in': False}), 200
