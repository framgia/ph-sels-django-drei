from django.urls import path, include
from .views import (
    StudentListView,
    StudentFollowView,
    CategoryListView,
    CategoryDetailView,
    StudentQuestionAnsweredView,
    StudentLessonView,
    StudentLessonViewByCategory,
    StudentLessonResultView,
)

urlpatterns = [
    path("", StudentListView.as_view(), name="student-list"),
    path(
        "follow/<int:pk>", StudentFollowView.as_view(), name="student-follow-unfollow"
    ),
    path("categories/", CategoryListView.as_view(), name="list-categories"),
    path("categories/<int:pk>", CategoryDetailView.as_view(), name="retrieve-category"),
    path("categories/<int:pk>", CategoryDetailView.as_view(), name="retrieve-category"),
    path(
        "answers/<int:pk>",
        StudentQuestionAnsweredView.as_view(),
        name="retrieve-student-answer",
    ),
    path(
        "lessons/",
        StudentLessonView.as_view(),
        name="get-student-lessons",
    ),
    path(
        "lessons/<int:pk>",
        StudentLessonViewByCategory.as_view(),
        name="retrieve-student-lesson",
    ),
    path(
        "lessons/results/<int:pk>",
        StudentLessonResultView.as_view(),
        name="retrieve-student-lesson-result",
    ),
]
