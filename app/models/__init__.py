# app/models/__init__.py
from app import app, db

# Create a SQLAlchemy instance

# Import your models to ensure they get registered with SQLAlchemy
from app.models.user import User

# Additional initialization code for the models package, if needed
# For example, you might add before_request or after_request hooks here

# Add the following block to create database tables when executed directly
if __name__ == '__main__':
    with app.app_context():
        db.create_all()

# End of __init__.py
