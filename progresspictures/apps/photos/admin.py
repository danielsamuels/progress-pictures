from django.contrib import admin

from .models import Category


class CategoryAdmin(admin.ModelAdmin):

    prepopulated_fields = {
        'url_title': ('name',)
    }


admin.site.register(Category, CategoryAdmin)
