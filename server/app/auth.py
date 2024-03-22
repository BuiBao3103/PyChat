from flask_login import current_user
from functools import wraps
from server.app.errors import InvalidAPIUsage


def protect():
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not current_user.is_authenticated:
                raise InvalidAPIUsage(message='You are not logged in! Please log in to get access.', status_code=401)
            return f(*args, **kwargs)

        return decorated_function

    return decorator
