from django.core.exceptions import ValidationError
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .serializers import AdminCategorySerializer
from learning_app.models import Category
from .pagination import CategoryTablePagination


class AdminRetrieveUpdateCategoryView(generics.RetrieveUpdateAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = AdminCategorySerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    lookup_field = "pk"


class AdminListCreateCategoryView(generics.ListCreateAPIView):
    queryset = Category.objects.filter(is_active=True).order_by("pk")
    serializer_class = AdminCategorySerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = CategoryTablePagination
