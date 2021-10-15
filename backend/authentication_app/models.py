from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from .managers import CustomUserManager

# Create your models here.


class Student(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    avatar = models.ImageField(
        upload_to="uploads/%Y/%m/%d", null=True, blank=True, max_length=255
    )
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "password"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email
