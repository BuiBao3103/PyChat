# app/controllers/__init__.py

# Import any controllers you want to expose from this package
from server.app.controllers.friendship_controller import FriendshipController
from server.app.controllers.auth_controller import AuthController
from server.app.controllers.user_controller import UserController
from server.app.controllers.view_controller import ViewController
from server.app.controllers.conversation_controller import ConversationController
from server.app.controllers.message_controller import MessageController
# Additional initialization code for the controllers package, if needed
# For example, you might set up some global configurations here

# End of __init__.py
