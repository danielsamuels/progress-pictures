from .models import User

from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):

    image = serializers.Field('image')

    class Meta:
        model = User
        fields = ('url', 'email', 'first_name', 'last_name', 'image')
