from django.db import models
from django.contrib.auth.models import User


def get_path(instance, filename):
    return '/'.join([filename, ])


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    file1 = models.FileField(blank=True, null=True, upload_to=get_path)
    file2 = models.FileField(blank=True, null=True, upload_to=get_path)

    def __str__(self):
        return '{} Profile'.format(self.user.username)
