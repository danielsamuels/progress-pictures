from django.apps import AppConfig
from django.db.models.signals import post_save

from .models import Album, Image
from .signals import handle_album_post_save, handle_image_post_save


class ImagesConfig(AppConfig):
    name = 'progresspictures.apps.images'

    def ready(self):
        post_save.connect(handle_album_post_save, sender=Album)
        post_save.connect(handle_image_post_save, sender=Image)
