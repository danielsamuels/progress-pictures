from django.db import models
from django.conf import settings


class Album(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
    )

    title = models.CharField(
        max_length=100,
    )

    # UserPK-AlbumPK -> Hashed
    url_title = models.SlugField(
        "URL title",
        max_length=100,
        blank=True,
        null=True,
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

    def __unicode__(self):
        return self.title


class Image(models.Model):

    album = models.ForeignKey(
        Album,
    )

    file = models.ImageField(
        upload_to='uploads/files'
    )

    # UserPK-AlbumPK-ImagePK -> Hashed
    title = models.CharField(
        max_length=100,
    )

    url_title = models.SlugField(
        "URL title",
        max_length=100,
        blank=True,
        null=True,
    )

    date_added = models.DateTimeField(
        auto_now_add=True,
    )

    date_taken = models.DateTimeField()

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
