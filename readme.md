
```bash
< PROJECT ROOT >
   |
   |-- app/
   |    |
   |    |-- __init__.py           # Initialize the app package
   |    |-- config.py             # App Configuration
   |    |-- forms.py              # App Forms: login, registration
   |    |
   |    |-- models.py                # Folder for your models
   |    |
   |    |-- static/
   |    |    |-- css/              # CSS files
   |    |    |-- js/               # JavaScript files
   |    |    |-- images/           # Image files
   |    |
   |    |-- templates/            # HTML templates
   |    |    |
   |    |    |-- includes/         # Page chunks, components
   |    |    |    |
   |    |    |    |-- navigation.html  # Top bar
   |    |    |    |-- sidebar.html     # Left sidebar
   |    |    |    |-- scripts.html     # JS scripts common to all pages
   |    |    |    |-- footer.html      # The common footer
   |    |    |
   |    |    |-- layouts/          # App Layouts (the master pages)
   |    |    |    |
   |    |    |    |-- footer.html    # Used by common pages like index, UI
   |    |    |
   |    |    |-- accounts/         # Auth Pages (login, register, etc.)
   |    |    |    |
   |    |    |    |-- login.html   # Use layout `base-fullscreen.html`
   |    |    |    |-- register.html  # Use layout `base-fullscreen.html`
   |    |    |    |-- dashboard.html  # User dashboard after login
   |    |    |
   |    |  chat.html              # The default page
   |    |  page-404.html           # Error 404 page (page not found)
   |    |  page-500.html           # Error 500 page (server error)
   |    |    *.html                # All other pages provided by the UI Kit
   |    |
   |    |-- routes/                # Folder for your routes
   |    |    |
   |    |    |-- __init__.py       # Initialize the routes package
   |    |    |-- view.py          # Example route file
   |    |    |-- about.py          # Example route file
   |    |    |-- contact.py        # Example route file
   |    |    |-- auth.py           # Auth routes (login, register, logout)
   |    |
   |    |-- controllers/          # Folder for your controllers
   |    |    |
   |    |    |-- __init__.py       # Initialize the controllers package
   |    |    |-- index_controller.py  # Example controller file
   |    |    |-- about_controller.py  # Example controller file
   |    |    |-- contact_controller.py  # Example controller file
   |    |    |-- auth_controller.py    # Auth controller file
   |    |
   |    |-- socketio/             # Folder for your Socket.IO events
   |    |    |
   |    |    |-- __init__.py       # Initialize the socketio package
   |    |    |-- events.py          # File for Socket.IO event handlers
   |    |
   |    |-- requirements.txt       # Application Dependencies
   |    |
   |    |-- run.py                 # Start the app in development and production
   |
   |-- ************************************************************************
```

```bash
python -v venv .venv
.\.venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Run the Template
# --host=0.0.0.0 - expose the app on all network interfaces (default 127.0.0.1)
# --port=5000    - specify the app port (default 5000)  
flask run --host=0.0.0.0 --port=5000 --debug

# Access the UI in browser: http://127.0.0.1:5000/
```

```
#get all strings for translation
pybabel extract -F babel.cfg -k _l -o messages.pot .

#init po file (first time):
pybabel init -i messages.pot -d app/translations -l vi
pybabel init -i messages.pot -d app/translations -l en

#compile translations
pybabel compile -d app/translations

#update exist po file
pybabel extract -F babel.cfg -k _l -o messages.pot .
pybabel update -i messages.pot -d app/translations
pybabel compile -d app/translations
```