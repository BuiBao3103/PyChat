import os
from decouple import config
from urllib.parse import quote

# Grabs the folder where the script runs.
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    CSRF_ENABLED = True
    BABEL_DEFAULT_LOCALE = 'vi'
    BABEL_TRANSLATION_DIRECTORIES = 'translations'
    # Set up the App SECRET_KEY
    SECRET_KEY = config('SECRET_KEY', default='S#perS3crEt_007')

    # MySQL configuration
    MYSQL_USER = config('MYSQL_USER', default='your_mysql_username')
    MYSQL_PASSWORD = config('MYSQL_PASSWORD', default='your_mysql_password')
    MYSQL_DB = config('MYSQL_DB', default='your_mysql_database_name')
    MYSQL_HOST = config('MYSQL_HOST', default='localhost')
    MYSQL_PORT = config('MYSQL_PORT', default=3306, cast=int)
    SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{MYSQL_USER}:%s@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}?charset=utf8mb4' % quote(
        MYSQL_PASSWORD)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
