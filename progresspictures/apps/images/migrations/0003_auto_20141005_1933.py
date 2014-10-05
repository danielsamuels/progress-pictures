# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0002_auto_20141004_1218'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='date_taken',
            field=models.DateTimeField(null=True, blank=True),
        ),
    ]
