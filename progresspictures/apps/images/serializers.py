from .models import Album, Image

from rest_framework import serializers


class ImageSerializer(serializers.ModelSerializer):

    url = serializers.Field('get_absolute_url')

    class Meta:
        model = Image
        fields = ['album', 'file', 'title', 'date_added', 'date_taken', 'url']
        exclude = ['user']


class AlbumSerializer(serializers.ModelSerializer):

    url = serializers.Field('get_absolute_url')

    image_set = ImageSerializer(
        many=True,
        required=False,
    )

    class Meta:
        model = Album
        fields = ['title', 'date_added', 'public', 'order', 'image_set', 'url']
        exclude = ['user']
        depth = 1
