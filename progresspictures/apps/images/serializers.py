from .models import Album, Image

from rest_framework import serializers


class AlbumSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Album


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Image
