from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

import hashlib


class UserManager(BaseUserManager):
    def _create_user(self, email, password, first_name, last_name, is_staff, is_superuser):
        email = self.normalize_email(email)

        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            is_staff=is_staff,
            is_superuser=is_superuser,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, first_name, last_name, is_staff, is_superuser):
        return self._create_user(email, password, first_name, last_name, False, False)

    def create_superuser(self, email, password, first_name, last_name):
        return self._create_user(email, password, first_name, last_name, True, True)


class User(AbstractBaseUser, PermissionsMixin):

    objects = UserManager()

    email = models.EmailField(
        unique=True,
    )

    first_name = models.CharField(
        max_length=100,
    )

    last_name = models.CharField(
        max_length=100,
    )

    is_staff = models.BooleanField(
        'staff status',
        default=False,
        help_text='Designates whether the user can log into this admin site.',
    )

    is_active = models.BooleanField(
        'active',
        default=True,
        help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.'
    )

    date_joined = models.DateTimeField(
        'date joined',
        default=timezone.now
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return u'{} {}'.format(
            self.first_name,
            self.last_name
        )

    def get_short_name(self):
        return u'{}'.format(
            self.first_name
        )

    def image(self):
        return "http://www.gravatar.com/avatar/{}?s=40".format(hashlib.md5(self.user.email).hexdigest())

    def __unicode__(self):
        return self.get_full_name()
