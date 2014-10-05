from django.db import models
from django.conf import settings


class Album(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
    )

    title = models.CharField(
        max_length=100,
    )

    date_added = models.DateTimeField(
        auto_now_add=True,
    )

    public = models.BooleanField(
        default=False,
    )

    order = models.PositiveIntegerField(
        default=1,
    )

    def get_absolute_url(self):
        return '/album/{}/'.format(
            self.pk,
        )

    def __unicode__(self):
        return self.title


class Image(models.Model):

    album = models.ForeignKey(
        Album,
    )

    file = models.ImageField(
        upload_to='uploads/files'
    )

    title = models.CharField(
        max_length=100,
    )

    date_added = models.DateTimeField(
        auto_now_add=True,
    )

    date_taken = models.DateTimeField(
        blank=True,
        null=True
    )

    def get_absolute_url(self):
        return '{}image/{}'.format(
            self.album.get_absolute_url(),
            self.pk
        )

    def __unicode__(self):
        return self.title


class Data(models.Model):

    album = models.ForeignKey(
        Album,
    )

    image = models.ForeignKey(
        Image,
        blank=True,
        null=True,
    )

    label = models.CharField(
        max_length=1000,
    )

    value = models.CharField(
        max_length=1000,
    )

    unit = models.CharField(
        max_length=100,
    )

    date = models.DateTimeField()
