"""
Django settings for progresspictures project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
from django.core.urlresolvers import reverse_lazy

import os

SITE_DOMAIN = '127.0.0.1:8000'
SITE_NAME = 'Progress Pictures'

ALLOWED_HOSTS = [
    SITE_DOMAIN,
    'www.{}'.format(SITE_DOMAIN)
]

SUIT_CONFIG = {
    'ADMIN_NAME': SITE_NAME
}


BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'a+2ftk*#tsa+xj4%j2$#0*5oc&(u%6#q)*d=^vx^nic44ly$e!'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

TEMPLATE_DEBUG = DEBUG

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = (
    'suit',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',

    # Project apps
    'progresspictures.apps.images',
    'progresspictures.apps.users',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

APPEND_SLASH = True

ROOT_URLCONF = 'progresspictures.urls'

WSGI_APPLICATION = 'progresspictures.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'progresspictures',
        'USER': 'danielsamuels',
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-gb'

TIME_ZONE = 'Europe/London'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Auto-discovery of project location.

SITE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/
# Absolute path to the directory where static files will be collected.

STATICFILES_DIRS = (
    os.path.join(SITE_ROOT, "static"),
)

STATIC_ROOT = "/home/progresspictures/webapps/progresspictures_static"

STATIC_URL = "/static/"


# Absolute path to the directory where all uploaded media files are stored.

MEDIA_ROOT = "/home/progresspictures/webapps/progresspictures_media"

MEDIA_URL = "/media/"

FILE_UPLOAD_PERMISSIONS = 0644


TEMPLATE_DIRS = (
    os.path.join(SITE_ROOT, "templates"),
)

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.request',
)

# Replace the User model
LOGIN_URL = reverse_lazy('auth:login')
AUTH_USER_MODEL = 'users.User'
LOGIN_REDIRECT_URL = '/'

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.UnicodeJSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    )
}
