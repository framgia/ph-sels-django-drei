from rest_framework import serializers
from authentication_app.models import Student
from rest_polymorphic.serializers import PolymorphicSerializer
from .models import (
    Category,
    Choice,
    Question,
    StudentFollowInformation,
    StudentQuestionAnswered,
    StudentLesson,
    StudentActivityLog,
)


class StudentActivityLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentActivityLog
        fields = ["id", "created"]


class StudentLessonResultSerializer(serializers.ModelSerializer):
    is_correct_answer = serializers.SerializerMethodField()
    category = serializers.StringRelatedField()
    question = serializers.StringRelatedField()
    answer = serializers.StringRelatedField()

    class Meta:
        model = StudentQuestionAnswered
        fields = ["id", "category", "question", "answer", "is_correct_answer"]

    def get_is_correct_answer(self, obj):
        try:
            return obj.answer.value == obj.question.choices.get(is_answer=True).value
        except:
            return False


class StudentQuestionAnsweredSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentQuestionAnswered
        fields = [
            "question",
        ]
        extra_kwargs = {"question": {"read_only": True}}


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = "__all__"


class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True)

    class Meta:
        model = Question
        fields = "__all__"


class CategoryDetailSerializer(serializers.ModelSerializer):
    question = QuestionSerializer(many=True)

    class Meta:
        model = Category
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class StudentListSerializer(serializers.ModelSerializer):
    total_followers = serializers.SerializerMethodField()
    total_lesson_learned = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = [
            "id",
            "first_name",
            "last_name",
            "avatar",
            "total_followers",
            "total_lesson_learned",
        ]

    def get_total_followers(self, obj):
        return obj.student_follow.all().count()

    def get_total_lesson_learned(self, obj):
        return obj.student_lesson.all().count()


class StudentLessonSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    total_items = serializers.SerializerMethodField()
    total_answer = serializers.SerializerMethodField()
    total_lessons = serializers.SerializerMethodField()
    student = StudentListSerializer()

    class Meta:
        model = StudentLesson
        fields = "__all__"

    def get_total_items(self, obj):
        return obj.category.student_category_answer.all().count()

    def get_total_answer(self, obj):
        total_answers = 0
        try:
            answer_set = obj.student.student_answer.all()
            for i in range(0, len(answer_set)):
                if (
                    obj.category.question.all()[i].choices.get(is_answer=True)
                    == obj.student.student_answer.all()[i].answer
                ):
                    total_answers += 1
            
        except:
            pass

        return total_answers

    def get_total_lessons(self, obj):
        return StudentLesson.objects.filter(student=obj.student).count()


class StudentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["first_name", "last_name", "avatar"]


class StudentFollowSerializer(serializers.ModelSerializer):
    student = StudentListSerializer()
    total_followers = serializers.SerializerMethodField()
    total_following = serializers.SerializerMethodField()
    follower = StudentListSerializer()

    class Meta:
        model = StudentFollowInformation
        fields = [
            "student",
            "is_following",
            "total_followers",
            "total_following",
            "follower",
            "created",
        ]

    def get_total_followers(self, obj):
        return StudentFollowInformation.objects.filter(
            student=obj.student, is_following=True
        ).count()

    def get_total_following(self, obj):
        return StudentFollowInformation.objects.filter(
            is_following=True, follower=obj.student
        ).count()


class STAPolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        StudentActivityLog: StudentActivityLogSerializer,
        StudentFollowInformation: StudentFollowSerializer,
        StudentLesson: StudentLessonSerializer,
    }
