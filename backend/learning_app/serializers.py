from rest_framework import serializers
from authentication_app.models import Student
from .models import Category, StudentFollowInformation


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class StudentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["first_name", "last_name", "avatar"]


class StudentFollowSerializer(serializers.ModelSerializer):
    student = StudentDetailSerializer()
    total_followers = serializers.SerializerMethodField()
    total_following = serializers.SerializerMethodField()

    class Meta:
        model = StudentFollowInformation
        fields = ["student", "is_following", "total_followers", "total_following"]

    def get_total_followers(self, obj):
        return StudentFollowInformation.objects.filter(
            student=obj.student, is_following=True
        ).count()

    def get_total_following(self, obj):
        return StudentFollowInformation.objects.filter(
            is_following=True, follower=obj.student
        ).count()


class StudentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["id", "first_name", "last_name", "avatar"]
