from django.contrib import admin
from .models import (
    Category,
    StudentFollowInformation,
    Question,
    Choice,
    StudentQuestionAnswered,
    StudentLesson,
)

# Register your models here.
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ("question", "value", "is_answer")


class StudentQuestionAnsweredAdmin(admin.ModelAdmin):
    list_display = ("student", "question", "answer")


class StudentLessonAdmin(admin.ModelAdmin):
    list_display = ("student", "category", "is_finished")


admin.site.register(StudentFollowInformation)
admin.site.register(Category)
admin.site.register(Question)
admin.site.register(Choice, ChoiceAdmin)
admin.site.register(StudentQuestionAnswered, StudentQuestionAnsweredAdmin)
admin.site.register(StudentLesson, StudentLessonAdmin)
