from django.contrib import admin
from . models import  User
# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display=('email','phone','is_email_verified','email_verification_token','forgot_password_token')


admin.site.register(User,UserAdmin)
    