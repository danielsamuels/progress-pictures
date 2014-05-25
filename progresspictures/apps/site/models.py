from django.conf import settings
from django.db import models

import hashlib


class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
    )

    date_of_birth = models.DateField(
        help_text='Optional. Used to calculate BMI and other statistics.',
        blank=True,
        null=True,
    )

    def profile_image_url(self):
        return "http://www.gravatar.com/avatar/{}?s=40".format(hashlib.md5(self.user.email).hexdigest())


# settings.AUTH_USER_MODEL.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])
