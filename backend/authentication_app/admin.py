from django.contrib import admin

from .models import Student
from rest_framework_simplejwt import token_blacklist
from rest_framework_simplejwt.token_blacklist.admin import OutstandingTokenAdmin

# Register your models here.


admin.site.register(Student)


class OutstandingTokenAdmin(token_blacklist.admin.OutstandingTokenAdmin):
    def has_delete_permission(self, *args, **kwargs):
        return True  # or whatever logic you want


admin.site.unregister(token_blacklist.models.OutstandingToken)
admin.site.register(token_blacklist.models.OutstandingToken, OutstandingTokenAdmin)
