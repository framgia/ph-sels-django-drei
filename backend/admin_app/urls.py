from django.urls import path
from .views import (
    AdminListCreateCategoryView,
    AdminRetrieveUpdateCategoryView,
    AdminListCreateQuestionView,
    AdminRetrieveUpdateQuestionView,
    AdminDeleteQuestionView,
)


urlpatterns = [
    path(
        "categories/",
        AdminListCreateCategoryView.as_view(),
        name="list-create-category-admin",
    ),
    path(
        "categories/<int:pk>",
        AdminRetrieveUpdateCategoryView.as_view(),
        name="retrieve-update-category-admin",
    ),
    path(
        "categories/<int:pk>/question/",
        AdminListCreateQuestionView.as_view(),
        name="list-create-question-admin",
    ),
    path(
        "categories/<int:category>/question/<int:id>",
        AdminRetrieveUpdateQuestionView.as_view(),
        name="retrieve-update-question-admin",
    ),
    path(
        "categories/<int:category>/question/<int:id>/delete",
        AdminDeleteQuestionView.as_view(),
        name="delete-question-admin",
    ),
]
