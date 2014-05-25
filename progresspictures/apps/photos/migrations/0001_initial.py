# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    depends_on = (
        ('users', '0001_initial'),
    )

    def forwards(self, orm):
        # Adding model 'Category'
        db.create_table(u'photos_category', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['users.User'])),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('url_title', self.gf('django.db.models.fields.SlugField')(max_length=100)),
        ))
        db.send_create_signal(u'photos', ['Category'])

        # Adding unique constraint on 'Category', fields ['name', 'user']
        db.create_unique(u'photos_category', ['name', 'user_id'])

        # Adding unique constraint on 'Category', fields ['url_title', 'user']
        db.create_unique(u'photos_category', ['url_title', 'user_id'])


    def backwards(self, orm):
        # Removing unique constraint on 'Category', fields ['url_title', 'user']
        db.delete_unique(u'photos_category', ['url_title', 'user_id'])

        # Removing unique constraint on 'Category', fields ['name', 'user']
        db.delete_unique(u'photos_category', ['name', 'user_id'])

        # Deleting model 'Category'
        db.delete_table(u'photos_category')


    models = {
        u'photos.category': {
            'Meta': {'unique_together': "(('name', 'user'), ('url_title', 'user'))", 'object_name': 'Category'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'url_title': ('django.db.models.fields.SlugField', [], {'max_length': '100'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['users.User']"})
        },
        u'users.user': {
            'Meta': {'object_name': 'User'},
            'date_of_birth': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'email_address': ('django.db.models.fields.EmailField', [], {'unique': 'True', 'max_length': '75'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'})
        }
    }

    complete_apps = ['photos']
