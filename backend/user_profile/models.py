from django.db import models
from django.contrib.auth.models import User

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


def get_path(instance, filename):
    return '/'.join([str(instance.user.username), filename])


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    file1 = models.FileField(blank=True, null=True, upload_to=get_path)
    file2 = models.FileField(blank=True, null=True, upload_to=get_path)

    def __str__(self):
        return '{} Profile'.format(self.user.username)


@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
