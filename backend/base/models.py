from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save, post_delete
from django.core.mail import send_mail
from django.conf import settings
import uuid
# Create your models here.

class User(AbstractUser):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    phone = models.CharField(max_length=12)
    is_email_verified = models.BooleanField(default=False)
    email_verification_token = models.CharField(max_length=200, null=True,blank=True)
    forgot_password_token = models.CharField(max_length=200, null=True,blank=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def name(self):
        return self.first_name + ' ' + self.last_name
    
    def name(self):
        return self.email


            
       
            