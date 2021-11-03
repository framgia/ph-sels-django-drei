from django.core.exceptions import ValidationError
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.serializers import Serializer
from .serializers import AdminCategorySerializer, AdminQuestionSerializer
from learning_app.models import Category, Question, Choice
from .pagination import CategoryTablePagination
from django.shortcuts import get_object_or_404
from rest_framework.response import Response


class MultipleFieldLookupMixin(object):
    def get_object(self):
        queryset = self.get_queryset()
        queryset = self.filter_queryset(queryset)
        filter = {}
        for field in self.lookup_fields:
            if self.kwargs.get(field, None):
                filter[field] = self.kwargs[field]
        obj = get_object_or_404(queryset, **filter)  # Lookup the object
        self.check_object_permissions(self.request, obj)
        return obj


class AdminDeleteQuestionView(MultipleFieldLookupMixin, generics.DestroyAPIView):
    queryset = Question.objects.filter(is_active=True)
    serializer_class = AdminQuestionSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    lookup_fields = ("category", "id")

    def destroy(self, request, *args, **kwargs):
        question = self.get_object()
        question.is_active = False
        question.save()
        return Response(data={"success": "Delete succesful"})


class AdminRetrieveUpdateQuestionView(
    MultipleFieldLookupMixin, generics.RetrieveUpdateAPIView
):
    queryset = Question.objects.filter(is_active=True)
    serializer_class = AdminQuestionSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    lookup_fields = ("category", "id")


class AdminListCreateQuestionView(generics.ListCreateAPIView):
    serializer_class = AdminQuestionSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = CategoryTablePagination

    def get_queryset(self):
        category_id = self.kwargs.get("pk")
        return Question.objects.filter(
            category_id=category_id, category__is_active=True, is_active=True
        )


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
