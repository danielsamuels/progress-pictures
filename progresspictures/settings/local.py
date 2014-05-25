from base import *

# Enable debug mode for local development.
DEBUG = True

TEMPLATE_DEBUG = DEBUG

# Enable additional apps.
INSTALLED_APPS = INSTALLED_APPS + (
    'django_extensions',
)

# Email settings
EMAIL_HOST = 'mailtrap.io'
EMAIL_HOST_USER = '10219746c1ef0dd1a'
EMAIL_HOST_PASSWORD = '9d303879d1f016'
EMAIL_PORT = '2525'
EMAIL_USE_TLS = True

# Save media files to the user's Sites folder.

MEDIA_ROOT = os.path.expanduser("~/Sites/personal/progresspictures/media")

STATIC_ROOT = os.path.expanduser("~/Sites/personal/progresspictures/static")
