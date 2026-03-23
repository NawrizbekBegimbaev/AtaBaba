"""
PythonAnywhere WSGI configuration file.

Copy the contents of this file into your PythonAnywhere WSGI config
(Web tab → WSGI configuration file).

Replace 'yourusername' with your actual PythonAnywhere username.
"""

import os
import sys

# Add your project directory to the sys.path
project_home = '/home/Nawrizbek190406/AtaBaba/server'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Set environment variables
os.environ['DJANGO_SETTINGS_MODULE'] = 'config.settings'
os.environ['DJANGO_DEBUG'] = 'False'
os.environ['DJANGO_ALLOWED_HOSTS'] = 'nawrizbek190406.pythonanywhere.com'
os.environ['DJANGO_SECRET_KEY'] = 'atababa-shejire-2024-kz-prod-s3cr3t-key-x9f2m'

# Activate your virtualenv
virtualenv_path = '/home/Nawrizbek190406/.virtualenvs/atababa/lib/python3.10/site-packages'
if virtualenv_path not in sys.path:
    sys.path.insert(0, virtualenv_path)

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
