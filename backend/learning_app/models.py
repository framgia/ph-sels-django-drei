from django.db import models
from authentication_app.models import Student
from polymorphic.models import PolymorphicModel

# Create your models here.


class StudentFollowInformation(models.Model):
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, related_name="student"
    )
    follower = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name="student_follower",
        blank=True,
        null=True,
    )
    is_following = models.BooleanField(default=True)
