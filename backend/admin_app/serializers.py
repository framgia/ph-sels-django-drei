from rest_framework import serializers
from learning_app.models import Category


class AdminCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
