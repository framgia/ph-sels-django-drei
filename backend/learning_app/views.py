from rest_framework import generics
from rest_framework.validators import ValidationError
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from .models import (
    StudentFollowInformation,
    Category,
    StudentQuestionAnswered,
    Question,
    StudentLesson,
    Student,
    StudentActivityLog,
)
from authentication_app.models import Student
from .serializers import (
    CategoryDetailSerializer,
    StudentDetailSerializer,
    StudentLessonSerializer,
    StudentListSerializer,
    StudentFollowSerializer,
    CategorySerializer,
    CategoryDetailSerializer,
    StudentQuestionAnsweredSerializer,
    StudentLessonResultSerializer,
    STAPolymorphicSerializer,
)
from .pagination import CategoryListPagination, StudentListPagination
from rest_framework.response import Response
from django.db.models import Q


class StudentActivityLogListView(generics.ListAPIView):

    serializer_class = STAPolymorphicSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StudentListPagination

    def get_queryset(self):
        student_id = self.kwargs.get("pk")
        following_users = StudentFollowInformation.objects.filter(
            follower_id=student_id, is_following=True
        )

        following_list = [student_id]
        for f in following_users:
            following_list.append(f.student_id)

        queryset = StudentActivityLog.objects.filter(
            Q(
                StudentFollowInformation___follower_id__in=following_list,
            )
            | Q(StudentLesson___student_id__in=following_list)
        ).order_by("-created")
        return queryset


class StudentLessonResultView(generics.ListAPIView):

    serializer_class = StudentLessonResultSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        print(self.request.user)
        return StudentQuestionAnswered.objects.filter(
            student=self.request.user, category_id=self.kwargs.get("pk")
        )


class StudentLessonViewByCategory(APIView):
    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request, pk):
        try:
            lesson = StudentLesson.objects.get(student=request.user, category_id=pk)
            serializer = StudentLessonSerializer(lesson)
            return Response(serializer.data)
        except:
            return Response(None)


class StudentLessonView(APIView):
    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request):
        studentLesson = StudentLesson.objects.filter(student=request.user)
        serializer = StudentLessonSerializer(studentLesson, many=True)
        return Response(serializer.data)


class StudentQuestionAnsweredView(generics.CreateAPIView):
    queryset = StudentQuestionAnswered.objects.all()
    serializer_class = StudentQuestionAnsweredSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def perform_create(self, serializer):
        answers = self.request.data.get("answers")
        queryset = StudentQuestionAnswered.objects.filter(
            student=self.request.user, category=self.request.data.get("category")
        )
        if queryset.exists():
            raise ValidationError({"error": "Course already taken"})

        # Validate if user manually insert an answer with incorrect length
        category_id = self.request.data.get("category")
        question_count = Question.objects.filter(category=category_id).count()
        if len(answers) != question_count:
            raise ValidationError({"error": "You must supply all the answers"})

        # create bulk answers on
        try:
            obj = []
            for question in answers:
                obj.append(
                    StudentQuestionAnswered(
                        student=self.request.user,
                        category_id=self.request.data.get("category"),
                        question_id=int(question),
                        answer_id=int(answers[question]),
                    )
                )
            StudentLesson.objects.create(
                student=self.request.user,
                category_id=self.request.data.get("category"),
                is_finished=True,
            )
            return StudentQuestionAnswered.objects.bulk_create(obj)
        except:
            raise ValidationError({"error": "Answers have not been recorded"})


class CategoryDetailView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = "pk"


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [
        IsAuthenticated,
    ]
    pagination_class = CategoryListPagination


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
    filter_backends = [filters.SearchFilter]
    search_fields = ["first_name", "last_name"]

    def get_queryset(self):
        return Student.objects.exclude(email=self.request.user)
