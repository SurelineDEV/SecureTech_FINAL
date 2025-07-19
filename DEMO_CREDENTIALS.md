# SecureTech Demo Credentials

## 🔐 Login Credentials

### Admin Access
- **Email**: admin@securetech.com
- **Password**: admin123
- **Role**: Full administrative access
- **Features**: User management, company settings, all reports

### Officer Access  
- **Email**: officer@securetech.com
- **Password**: officer123
- **Role**: Field operations
- **Features**: Clock in/out, incident reporting, schedule viewing

### Client Access
- **Email**: client@securetech.com
- **Password**: client123
- **Role**: Client portal
- **Features**: View reports, request services, billing

## 📊 Demo Data Included

- **Companies**: 1 demo company (SecureTech Demo Company)
- **Users**: 3 test users (admin, officer, client)
- **Company ID**: All users belong to company_id = '1'
- **Data Isolation**: Fully implemented and functional

## 🧪 Testing Notes

- All passwords are bcrypt hashed in the backend
- JWT tokens expire after 24 hours
- Company data isolation is enforced at API level
- All external services (Stripe, Mailgun) are mocked for demo

## 🔄 Adding More Demo Data

To add more users, modify the `users_db` dictionary in `app.py`:

```python
users_db = {
    'new_user@company.com': {
        'id': '4',
        'email': 'new_user@company.com',
        'password': bcrypt.hashpw('password123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
        'role': 'officer',  # admin, officer, or client
        'company_id': '1',
        'company_name': 'SecureTech Demo Company'
    }
}
```

