# backend/models.py
import uuid
from datetime import datetime, timezone
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def generate_uuid():
    return str(uuid.uuid4())


# ----------------------------
# SQLAlchemy Models
# ----------------------------


class User(db.Model):
    __tablename__ = 'user'
    user_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    accounts = db.relationship('Account', backref='user', lazy=True)


class Account(db.Model):
    __tablename__ = 'account'
    account_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    user_id = db.Column(db.String, db.ForeignKey('user.user_id'), nullable=False)
    currency = db.Column(db.String(3), default='USD')
    cash_balance = db.Column(db.Numeric(18,2), default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    portfolios = db.relationship('Portfolio', backref='account', lazy=True)
    orders = db.relationship('Order', backref='account', lazy=True)


class Portfolio(db.Model):
    __tablename__ = 'portfolio'
    portfolio_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    account_id = db.Column(db.String, db.ForeignKey('account.account_id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    positions = db.relationship('Position', backref='portfolio', lazy=True)
    trades = db.relationship('Trade', backref='portfolio', lazy=True)


class Position(db.Model):
    __tablename__ = 'position'
    position_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    portfolio_id = db.Column(db.String, db.ForeignKey('portfolio.portfolio_id'), nullable=False)
    symbol = db.Column(db.String(10), db.ForeignKey('symbol.symbol'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    avg_cost = db.Column(db.Numeric(18,4), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Order(db.Model):
    __tablename__ = 'order'
    order_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    account_id = db.Column(db.String, db.ForeignKey('account.account_id'), nullable=False)
    symbol = db.Column(db.String(10), db.ForeignKey('symbol.symbol'), nullable=False)
    order_type = db.Column(db.Enum('MARKET','LIMIT','STOP', name='order_type'), nullable=False)
    side = db.Column(db.Enum('BUY','SELL', name='order_side'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(18,4))
    status = db.Column(db.Enum('PENDING','FILLED','CANCELLED', name='order_status'), default='PENDING')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    filled_at = db.Column(db.DateTime)
    trades = db.relationship('Trade', backref='order', lazy=True)


class Trade(db.Model):
    __tablename__ = 'trade'
    trade_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    order_id = db.Column(db.String, db.ForeignKey('order.order_id'), nullable=False)
    executed_price = db.Column(db.Numeric(18,4), nullable=False)
    executed_qty = db.Column(db.Integer, nullable=False)
    executed_at = db.Column(db.DateTime, default=datetime.utcnow)
    transaction = db.relationship('Transaction', backref='trade', uselist=False)


class Transaction(db.Model):
    __tablename__ = 'transaction'
    transaction_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    account_id = db.Column(db.String, db.ForeignKey('account.account_id'), nullable=False)
    trade_id = db.Column(db.String, db.ForeignKey('trade.trade_id'), nullable=False)
    amount = db.Column(db.Numeric(18,2), nullable=False)
    balance_after = db.Column(db.Numeric(18,2), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)


class Symbol(db.Model):
    __tablename__ = 'symbol'
    symbol = db.Column(db.String(10), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    exchange = db.Column(db.String(50))
    price_history = db.relationship('MarketPriceHistory', backref='symbol_obj', lazy=True)


class MarketPriceHistory(db.Model):
    __tablename__ = 'market_price_history'
    history_id = db.Column(db.String, primary_key=True, default=generate_uuid)
    symbol = db.Column(db.String(10), db.ForeignKey('symbol.symbol'), nullable=False)
    price = db.Column(db.Numeric(18,4), nullable=False)
    date = db.Column(db.Date, nullable=False)

