from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.contrib import admin

from .forms import UserCreationForm
from .models import User


class UserAdmin(DjangoUserAdmin):

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (('first_name', 'last_name',), 'email', 'password1', 'password2',),
        }),
    )

    fieldsets = (
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'email', 'password')
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        ('Important dates', {
            'fields': ('last_login', 'date_joined')
        }),
    )

    list_display = ('email', 'first_name', 'last_name', 'is_staff')

    ordering = ('email',)

    add_form = UserCreationForm


admin.site.register(User, UserAdmin)
