from rest_framework import serializers
from .models import Student
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class StudentRetrieveUpdateSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(max_length=None, use_url=True)
    password = serializers.CharField(write_only=True, validators=[validate_password])
    oldPassword = serializers.CharField(write_only=True)

    class Meta:
        model = Student
        fields = [
            "email",
            "first_name",
            "last_name",
            "avatar",
            "password",
            "oldPassword",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_oldPassword(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password does not match")

        return value

    def validate(self, attrs):
        if len(attrs["first_name"]) < 2:
            raise serializers.ValidationError({"error": "First name is too short"})
        if len(attrs["last_name"]) < 2:
            raise serializers.ValidationError({"error": "Last name is too short"})

        return attrs

    def update(self, instance, validated_data):
        instance.email = validated_data.get("email", instance.email)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.avatar = validated_data.get("avatar", instance.avatar)

        try:
            instance.set_password(validated_data["password"])
            instance.save()
        except:
            pass
        instance.save()
        return instance


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        try:
            print(attrs)
            data = super().validate(attrs)

            data["user_id"] = self.user.pk
            data["is_admin"] = self.user.is_superuser
        except:
            raise serializers.ValidationError({"error": "No active credentials found"})

        return data


class RegisterStudentSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=Student.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Student
        fields = ("password", "password2", "email", "first_name", "last_name")
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
        }

    def validate(self, attrs):
        if len(attrs["first_name"]) < 2:
            raise serializers.ValidationError({"error": "First name is too short"})
        if len(attrs["last_name"]) < 2:
            raise serializers.ValidationError({"error": "Last name is too short"})
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"error": "Password fields didn't match."}
            )

        return attrs

    def create(self, validated_data):
        student = Student.objects.create(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )

        student.set_password(validated_data["password"])
        student.save()

        return student
