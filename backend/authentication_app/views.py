from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from .serializers import (
    StudentSerializer,
    RegisterStudentSerializer,
    MyTokenObtainPairSerializer,
)
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from .permissions import OwnProfilePermission
from .models import Student


class RetrieveStudentProfileView(generics.RetrieveUpdateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated, OwnProfilePermission]
    parser_classes = [JSONParser, FormParser, MultiPartParser]
    lookup_url_kwarg = "pk"


# Create your views here.
class ObtainTokenPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class StudentSignUpView(generics.CreateAPIView):
    serializer_class = RegisterStudentSerializer
    queryset = Student.objects.all()


class StudentLogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
