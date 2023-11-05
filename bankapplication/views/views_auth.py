import json
import time
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from django.middleware.csrf import get_token
from django.views.decorators.http import require_http_methods

from ..models import User, Account
from ..serializers import *


def get_user_id_from_request(request):
    access = request.headers['Authorization']
    decoded_token = AccessToken(access.split(' ')[1].strip())
    user_id = decoded_token['user_id']
    return user_id


def create_user(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('pass1')
    email = data.get('email')
    first_name = data.get('firstName')
    last_name = data.get('lastName')

    user = User.objects.create_user(
        username=username, password=password, email=email, first_name=first_name, last_name=last_name)

    refresh = RefreshToken.for_user(user)

    return JsonResponse({'message': 'user created successfully', 'access': str(refresh.access_token), 'refresh': str(refresh)})


def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})
