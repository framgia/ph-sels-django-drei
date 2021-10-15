from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from .views import (
    StudentSignUpView,
    StudentLogoutView,
    RetrieveStudentProfileView,
    ObtainTokenPairView,
)

urlpatterns = [
    path("auth/token/", ObtainTokenPairView.as_view(), name="obtain-token"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="refresh-token"),
    path("auth/logout/", StudentLogoutView.as_view(), name="logout"),
    path("signup/", StudentSignUpView.as_view(), name="signup"),
    path(
        "profile/<int:pk>/",
        RetrieveStudentProfileView.as_view(),
        name="view-profile",
    ),
]
