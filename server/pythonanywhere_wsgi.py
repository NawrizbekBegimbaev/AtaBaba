"""
PythonAnywhere WSGI configuration file.

Copy the contents of this file into your PythonAnywhere WSGI config
(Web tab → WSGI configuration file).

Replace 'yourusername' with your actual PythonAnywhere username.
"""

import os
import sys

# Add your project directory to the sys.path
project_home = '/home/yourusername/AtaBaba/server'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Set environment variables
os.environ['DJANGO_SETTINGS_MODULE'] = 'config.settings'
os.environ['DJANGO_DEBUG'] = 'False'
os.environ['DJANGO_ALLOWED_HOSTS'] = 'yourusername.pythonanywhere.com'
os.environ['DJANGO_SECRET_KEY'] = 'CHANGE-THIS-TO-A-RANDOM-SECRET-KEY'

# Activate your virtualenv
# Uncomment the lines below if using a virtualenv:
# virtualenv_path = '/home/yourusername/.virtualenvs/atababa/lib/python3.10/site-packages'
# if virtualenv_path not in sys.path:
#     sys.path.insert(0, virtualenv_path)

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
