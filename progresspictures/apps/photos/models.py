from django.conf import settings
from django.db import models


class Category(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
    )

    name = models.CharField(
        max_length=100,
    )

    url_title = models.SlugField(
        "URL title",
        max_length=100,
    )

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = u'categories'
        ordering = ('name',)
