from django.conf import settings
from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView
from django.views.static import serve

from .apps.images.views import AlbumViewSet, ImageViewSet
from .apps.users.views import AuthView, UserViewSet

from rest_framework import routers

# Register API views
router = routers.DefaultRouter()
router.register(r'album', AlbumViewSet, base_name='album')
router.register(r'image', ImageViewSet, base_name='image')
router.register(r'user', UserViewSet, base_name='user')

# Core URLconf
urlpatterns = patterns(
    '',
    url(r'^api/', include(router.urls)),
    url(r'^api/auth/', AuthView.as_view()),
    url(r'^media/(?P<path>.*)$', serve, kwargs={'document_root': settings.MEDIA_ROOT}),
    url(r'^', TemplateView.as_view(template_name='base.html')),
)
