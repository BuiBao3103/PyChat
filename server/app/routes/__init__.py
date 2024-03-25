# app/routes/__init__.py

# from flask import Blueprint
#
# # Create a Blueprint instance for the 'routes' package
# routes_bp = Blueprint('routes', __name__)

# Import your route files to register them with the Blueprint
import server.app.routes.user
import server.app.routes.friendship
import server.app.routes.conversation
import server.app.routes.view


# Additional initialization code for the routes package, if needed
# For example, you might add before_request or after_request hooks here

# End of __init__.py


