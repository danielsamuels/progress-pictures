from django.conf import settings
from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.views.generic import TemplateView

from .apps.images.views import AlbumViewSet, ImageViewSet

from rest_framework import routers

# Register API views
router = routers.DefaultRouter()
router.register(r'albums', AlbumViewSet, base_name='album')
router.register(r'images', ImageViewSet, base_name='image')

# Core URLconf
urlpatterns = patterns(
    '',
    url(r'^$', TemplateView.as_view(template_name='base.html')),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
