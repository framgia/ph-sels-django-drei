from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination


class CategoryListPagination(PageNumberPagination):
    page_size = 9


class StudentListPagination(LimitOffsetPagination):
    default_limit = 20
