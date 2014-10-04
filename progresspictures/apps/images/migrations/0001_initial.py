# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=100)),
                ('url_title', models.SlugField(max_length=100, null=True, verbose_name=b'URL title', blank=True)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('public', models.BooleanField(default=False)),
                ('order', models.PositiveIntegerField(default=1)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Data',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('label', models.CharField(max_length=1000)),
                ('value', models.CharField(max_length=1000)),
                ('unit', models.CharField(max_length=100)),
                ('date', models.DateTimeField()),
                ('album', models.ForeignKey(to='images.Album')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('file', models.ImageField(upload_to=b'uploads/files')),
                ('title', models.CharField(max_length=100, null=True, blank=True)),
                ('url_title', models.SlugField(max_length=100, verbose_name=b'URL title')),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('date_taken', models.DateTimeField()),
                ('album', models.ForeignKey(to='images.Album')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='data',
            name='image',
            field=models.ForeignKey(blank=True, to='images.Image', null=True),
            preserve_default=True,
        ),
    ]
