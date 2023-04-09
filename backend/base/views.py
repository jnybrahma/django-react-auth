from django.shortcuts import render
from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save, post_delete
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status
from  base.models import User
from rest_framework.views import APIView
from base.serializers import  UserSerializer, UserSerializerWithToken
from django.core.mail import send_mail
from django.conf import settings
import uuid
# Create your views here.

       
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        
        
        for k,v  in serializer.items():
                data[k] = v 
                
                print(k,'-',v)
        
                            
        return data

class MyTokenObtainPairView(TokenObtainPairView):
        
    serializer_class = MyTokenObtainPairSerializer
    

@api_view(['POST'])  
def registerUser(request):
    
        data = request.data
        verification_token = uuid.uuid4()
        try:
           
            user = User.objects.create(
                  username=data['email'],
                  email = data['email'],
                  password= make_password(data['password']),
                  email_verification_token = verification_token
            )
            
            subject ="Your email needs to be verified"
            message = f'Hi, Please click on the link to verify email http://127.0.0.1:3000/verify-email/{verification_token}/'
            email_from = settings.EMAIL_HOST_USER
            recipient_list =[user.email]
            send_mail(subject, message, email_from, recipient_list)

            #serializer = UserSerializerWithToken(user,many=False)
            #return Response(serializer.data)
            message ={'detail' : 'Thank You For Signup! Please verify your email!'}
            return Response(message, status=status.HTTP_200_OK)  
            
        except:
              message  ={'detail' : 'User with this email already exists'}
              return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def verify_user(request, pk):
        
    try:
        user = User.objects.get(email_verification_token=pk)
        user.is_email_verified = True
        
        user.save()
        #serializer = UserSerializer(user, many=False)
        #return Response(serializer.data)
        message ={'detail' : 'Thank You! your email has verified! Now you can log in'}
        return Response(message, status=status.HTTP_200_OK)     
    
    except:
        message ={'detail' : 'Email is not verified! Please try again'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
        
    
@api_view(['GET'])
#@permission_classes([IsAdminUser])
def getUserProfile(request):
    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)

@api_view(['PUT'])  
def forgot_password(request, email):
    
    password_forgot_token = uuid.uuid4()
    
    try:
        user = User.objects.get(email=email)
        user.forgot_password_token = password_forgot_token
        user.save()
         
        subject ="Your Password Reset code"
       # message = f'Hi, Please click on the link to reset password http://127.0.0.1:8000/api/users/{password_forgot_token}/reset-password/'
        message = f'Hi, Please click on the link to reset password http://127.0.0.1:3000/reset-password/{password_forgot_token}/'
         
        email_from = settings.EMAIL_HOST_USER
        recipient_list =[user.email]
        send_mail(subject, message, email_from, recipient_list)
           
        message ={'detail' : 'Password reset link email has send to you!'}
        return Response(message, status=status.HTTP_200_OK)
        
    
    except:
        message ={'detail' : 'Email address not found! Please try again'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['PUT'])  
def password_reset(request, pk):
    
    data = request.data
             
    try:
        user = User.objects.get(forgot_password_token=pk)
        
        user.password= make_password(data['password'])
        
        user.save()
        
        message ={'detail' : 'Password has reset successfully!'}
        return Response(message, status=status.HTTP_200_OK)

    except:
        
        message = {'detail' : 'Sorry ! Password Unable to Reset!'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)