from rest_framework.pagination import LimitOffsetPagination


class StudentListPagination(LimitOffsetPagination):
    default_limit = 20
