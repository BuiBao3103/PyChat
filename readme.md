
```bash
< PROJECT ROOT >
   |
   |-- app/
   |    |
   |    | -- config.py                     # App Configuration
   |    | -- models.py                     # Database Tables
   |    | -- forms.py                      # App Forms: login, registration
   |    | -- util.py                       # Helpers to manipulate date, files
   |    | -- views.py                      # App Routing
   |    | -- __init__.py                   # Bundle all above sections and expose the Flask APP
   |    |
   |    |-- static/
   |    |    |-- <css, JS, images>         # CSS files, Javascripts files
   |    |
   |    |-- templates/
   |    |    |
   |    |    |-- includes/                 # Page chunks, components
   |    |    |    |
   |    |    |    |-- navigation.html      # Top bar
   |    |    |    |-- sidebar.html         # Left sidebar
   |    |    |    |-- scripts.html         # JS scripts common to all pages
   |    |    |    |-- footer.html          # The common footer
   |    |    |
   |    |    |-- layouts/                  # App Layouts (the master pages)
   |    |    |    |
   |    |    |    |-- base.html            # Used by common pages like index, UI
   |    |    |
   |    |    |-- accounts/                 # Auth Pages (login, register)
   |    |    |    |
   |    |    |    |-- login.html           # Use layout `base-fullscreen.html`
   |    |    |    |-- register.html        # Use layout `base-fullscreen.html`
   |    |    |
   |    |  index.html                      # The default page
   |    |  page-404.html                   # Error 404 page (page not found)
   |    |  page-500.html                   # Error 500 page (server error)
   |    |    *.html                        # All other pages provided by the UI Kit
   |
   |-- requirements.txt                    # Application Dependencies
   |
   |-- run.py                              # Start the app in development and production
   |
   |-- ************************************************************************
```

```bash
$ python -v venv .venv
$ .\.venv\Scripts\activate
$
$ # Install requirements
$ pip install -r requirements.txt
$
$ # Set the FLASK_APP environment variable
$ set FLASK_APP=run.py
$
$ # Set up the DEBUG environment
$ set FLASK_ENV=development
$
$ # Run the Jinja Template
$ # --host=0.0.0.0 - expose the app on all network interfaces (default 127.0.0.1)
$ # --port=5000    - specify the app port (default 5000)  
$ flask run --host=0.0.0.0 --port=5000
$
$ # Access the UI in browser: http://127.0.0.1:5000/
```