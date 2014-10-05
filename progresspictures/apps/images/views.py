from .models import Album, Image
from .serializers import AlbumSerializer, ImageSerializer

from rest_framework import viewsets


class AlbumViewSet(viewsets.ModelViewSet):
    serializer_class = AlbumSerializer

    def pre_save(self, obj):
        obj.user = self.request.user

    def get_queryset(self):
        return Album.objects.filter(
            user=self.request.user,
        )


class ImageViewSet(viewsets.ModelViewSet):
    serializer_class = ImageSerializer

    def get_queryset(self):
        return Image.objects.filter(
            album__user=self.request.user,
        )
