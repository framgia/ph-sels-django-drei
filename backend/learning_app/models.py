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


class Category(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=250)

    def __str__(self):
        return self.title


class Question(models.Model):
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="question"
    )
    description = models.CharField(max_length=100)

    def __str__(self):
        return self.description


class Choice(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="choice"
    )
    value = models.CharField(max_length=50)
    is_answer = models.BooleanField(default=False)

    def __str__(self):
        return self.value


class StudentQuestionAnswered(models.Model):
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, related_name="student_answer"
    )
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="student_category_answer"
    )
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="question_answered"
    )
    answer = models.ForeignKey(
        Choice, on_delete=models.CASCADE, related_name="student_anwer"
    )


class StudentLesson(models.Model):
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, related_name="student_lesson"
    )
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="student_category"
    )
    is_finished = models.BooleanField(default=False)
