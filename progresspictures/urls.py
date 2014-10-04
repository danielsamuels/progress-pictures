from django.conf import settings
from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.contrib import admin

from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = patterns(
    '',
    url(r'^api/', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/', include('progresspictures.apps.users.urls', namespace="auth")),

) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
