from django.urls import path
from .views import (
    AdminListCreateCategoryView,
    AdminRetrieveUpdateCategoryView,
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
]
