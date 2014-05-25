from django.conf import settings
from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.contrib import admin

from rest_framework import routers
from progresspictures.apps.photos import views

router = routers.DefaultRouter()
router.register(r'category', views.CategoryViewSet)

admin.autodiscover()

urlpatterns = patterns(
    '',
    url(r'^api/', include(router.urls)),
    url(r'^accounts/', include('progresspictures.apps.users.urls', namespace="auth")),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('progresspictures.apps.site.urls', namespace="site")),

) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
