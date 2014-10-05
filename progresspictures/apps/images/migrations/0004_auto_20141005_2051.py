# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0003_auto_20141005_1933'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='album',
            name='url_title',
        ),
        migrations.RemoveField(
            model_name='image',
            name='url_title',
        ),
    ]
