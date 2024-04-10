import os
from decouple import config
from urllib.parse import quote
from datetime import timedelta
# Grabs the folder where the script runs.
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    CSRF_ENABLED = True
    BABEL_DEFAULT_LOCALE = 'vi'
    BABEL_TRANSLATION_DIRECTORIES = 'translations'
    # Set up the App SECRET_KEY
    SECRET_KEY = config('SECRET_KEY')

    # MySQL configuration
    MYSQL_USER = config('MYSQL_USER')
    MYSQL_PASSWORD = config('MYSQL_PASSWORD', )
    MYSQL_DB = config('MYSQL_DB',)
    MYSQL_HOST = config('MYSQL_HOST')
    MYSQL_PORT = config('MYSQL_PORT', default=3306, cast=int)
    SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{MYSQL_USER}:%s@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}?charset=utf8mb4' % quote(
        MYSQL_PASSWORD)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Configure JWT settings
    JWT_SECRET_KEY = config('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES= timedelta(days=1)  # Token expiration time

