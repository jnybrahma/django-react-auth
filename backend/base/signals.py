from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save, post_delete
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings



def updateUser(sender, instance, **kwargs):
    ##print('Signal Triggered')
    user = instance
    if user.email != '':
        user.username = user.email

