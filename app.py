from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import bcrypt
import os
from datetime import datetime, timedelta

app = Flask(__name__, static_folder='frontend/build', static_url_path='')

CORS(app, origins="*")

# Configuration
app.config['JWT_SECRET_KEY'] = 'demo-secret-key-change-in-production'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
jwt = JWTManager(app)

# Demo users
users_db = {
    'admin@securetech.com': {
        'id': '1',
        'email': 'admin@securetech.com',
        'password': bcrypt.hashpw('admin123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
        'role': 'admin',
        'company_id': '1',
        'company_name': 'SecureTech Demo Company'
    },
    'officer@securetech.com': {
        'id': '2',
        'email': 'officer@securetech.com',
        'password': bcrypt.hashpw('officer123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
        'role': 'officer',
        'company_id': '1',
        'company_name': 'SecureTech Demo Company'
    },
    'client@securetech.com': {
        'id': '3',
        'email': 'client@securetech.com',
        'password': bcrypt.hashpw('client123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
        'role': 'client',
        'company_id': '1',
        'company_name': 'SecureTech Demo Company'
    }
}

# Routes - Serve React frontend
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    file_path = os.path.join(app.static_folder, path)
    if os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)
    else:
        # Handles React routing (e.g., /dashboard, /login)
        return send_from_directory(app.static_folder, 'index.html')

# Health check
@app.route('/api/health')
def health_check():
    return jsonify({
        'status': 'Backend and frontend ready!',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0-demo'
    }), 200

# Authentication Routes
@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email', '').lower()
        password = data.get('password', '')
        
        print(f"🔐 Login attempt: {email}")
        
        if email in users_db:
            user = users_db[email]
            if bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
                token = create_access_token(identity=email)
                print(f"✅ Login successful: {email} ({user['role']})")
                return jsonify({
                    'success': True,
                    'token': token,
                    'user': {
                        'id': user['id'],
                        'email': user['email'],
                        'role': user['role'],
                        'company_id': user['company_id'],
                        'company_name': user['company_name']
                    }
                }), 200
        
        print(f"❌ Login failed: {email}")
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
        
    except Exception as e:
        print(f"❌ Login error: {str(e)}")
        return jsonify({'success': False, 'message': 'Login failed'}), 500

if __name__ == '__main__':
    print("🚀 SecureTech Demo Backend Starting...")
    app.run(host='0.0.0.0', port=5000, debug=False)

