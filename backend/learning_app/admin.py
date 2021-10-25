from django.contrib import admin
from .models import Category, StudentFollowInformation

# Register your models here.

admin.site.register(StudentFollowInformation)

admin.site.register(Category)
