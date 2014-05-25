from django.conf.urls import patterns, url

import views


urlpatterns = patterns(
    '',
    url(r'$', views.HomepageView.as_view(), name='homepage'),
)
