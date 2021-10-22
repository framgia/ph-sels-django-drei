from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import StudentFollowInformation
from authentication_app.models import Student
from .serializers import (
    StudentDetailSerializer,
    StudentListSerializer,
    StudentFollowSerializer,
)
from .pagination import StudentListPagination
from rest_framework.response import Response

# Create your views here.
class StudentFollowView(APIView):
    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request, *args, **kwargs):
        try:
            student_follow_obj = StudentFollowInformation.objects.get(
                student_id=kwargs.get("pk"), follower=request.user
            )
            serializer = StudentFollowSerializer(student_follow_obj)
            return Response(serializer.data)
        except StudentFollowInformation.DoesNotExist:
            student = Student.objects.get(pk=kwargs.get("pk"))
            serializer = StudentDetailSerializer(student)
            total_followers = StudentFollowInformation.objects.filter(
                student=student, is_following=True
            ).count()
            total_following = StudentFollowInformation.objects.filter(
                is_following=True, follower=student
            ).count()
            return Response(
                {
                    "student": serializer.data,
                    "total_followers": total_followers,
                    "total_following": total_following,
                    "is_following": False,
                }
            )

    def post(self, request, *args, **kwargs):
        try:
            obj = StudentFollowInformation.objects.get(
                student_id=kwargs.get("pk"), follower=request.user
            )
            obj.is_following = not obj.is_following
            obj.save()
        except StudentFollowInformation.DoesNotExist:
            obj = StudentFollowInformation.objects.create(
                student_id=kwargs.get("pk"),
                follower=request.user,
            )
        serializer = StudentFollowSerializer(obj)
        return Response(serializer.data)


class StudentListView(generics.ListAPIView):
    serializer_class = StudentListSerializer
    pagination_class = StudentListPagination
    permission_classes = [
        IsAuthenticated,
    ]

    def get_queryset(self):
        return Student.objects.exclude(email=self.request.user)
