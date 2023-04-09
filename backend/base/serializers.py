from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from  base.models import User
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save, post_delete
from django.core.mail import send_mail
from django.conf import settings
import uuid



class UserSerializer(serializers.ModelSerializer):
    
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    
    
    class Meta:
        model = User
        fields = ['email', 'password', '_id','isAdmin','name','is_email_verified','email_verification_token','forgot_password_token']
    
    def get__id(self,obj):
        return obj.id
    
    def get_isAdmin(self,obj):
        return obj.is_staff
    
    def get_is_email_verified(self,obj):
        return obj.is_email_verified
    
    def get_email_verification_token(self,obj):
        return obj.email_verification_token
    
    def get_forgot_password_token(self,obj):
        return obj.forgot_password_token
    
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name
    
    
    
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'phone', 'isAdmin', 'token','is_email_verified','email_verification_token','forgot_password_token']
        
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    
    def get_is_email_verified(self, obj):
        
        return obj.is_email_verified
        