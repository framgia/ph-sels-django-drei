from rest_framework import serializers
from learning_app.models import Category, Question, Choice
from authentication_app.models import Student


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["id", "email", "first_name", "last_name", "last_login"]


class AdminChoiceSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Choice
        fields = ["id", "value", "is_answer"]


class AdminQuestionSerializer(serializers.ModelSerializer):
    choices = AdminChoiceSerializer(many=True)

    class Meta:
        model = Question
        fields = ["id", "is_active", "description", "choices"]

    def create(self, validated_data):
        choices = validated_data.pop("choices")
        category = self.context.get("view").kwargs.get("pk")
        if category:
            question = Question.objects.create(**validated_data, category_id=category)
            if len(choices) > 5:
                raise serializers.ValidationError({"error": "Maximum of 5 choices"})
            if len(choices) < 2:
                raise serializers.ValidationError({"error": "Minimum of 2 choices"})
            for choice in choices:
                Choice.objects.create(**choice, question=question)
            return question
        else:
            raise serializers.ValidationError({"error": "Could not find category"})

    def update(self, instance, validated_data):
        choices = validated_data.pop("choices")
        instance.description = validated_data.get("description", instance.description)
        instance.is_active = validated_data.get("is_active", instance.is_active)
        instance.save()
        keep_choices = []
        for choice in choices:
            if "id" in choice.keys():
                if Choice.objects.filter(id=choice["id"]).exists():
                    c = Choice.objects.get(id=choice["id"])
                    c.value = choice.get("value", c.value)
                    c.is_answer = choice.get("is_answer", c.is_answer)
                    c.save()
                    keep_choices.append(c.id)
                else:
                    continue
            else:
                c = Choice.objects.create(**choice, question=instance)
                keep_choices.append(c.id)

        for choice in instance.choices.all():
            if choice.id not in keep_choices:
                choice.delete()
        return instance


class AdminCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
