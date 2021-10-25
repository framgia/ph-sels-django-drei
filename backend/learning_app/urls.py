from django.urls import path, include
from .views import StudentListView, StudentFollowView, CategoryListView

urlpatterns = [
    path("", StudentListView.as_view(), name="student-list"),
    path(
        "follow/<int:pk>", StudentFollowView.as_view(), name="student-follow-unfollow"
    ),
    path("categories/", CategoryListView.as_view(), name="list-categories"),
]
