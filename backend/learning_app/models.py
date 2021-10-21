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


# class Category(models.Model):
#     title = models.CharField(max_length=50)
#     description = models.CharField(max_length=250)


# class Question(models.Model):
#     category = models.ForeignKey(Category, on_delete=models.CASCADE)
#     description = models.CharField(max_length=100)


# class Choice(models.Model):
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)
#     value = models.CharField(max_length=50)
#     is_answer = models.BooleanField(default=False)
