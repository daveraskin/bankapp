import json
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from django.middleware.csrf import get_token
from nanoid import generate

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


def create_account(request):
    user_id = get_user_id_from_request(request)
    user = User.objects.get(id=user_id)
    data = json.loads(request.body)
    account_number = generate('0123456789', 12)
    while (Account.objects.filter(account_number=account_number).exists()):
        account_number = generate('0123456789', 12)
    name = data['name']
    account_type = data['account_type']
    user = user
    account = Account.objects.create(
        name=name, account_type=account_type, user=user, balance=0.0, account_number=account_number
    )
    accountSerializer = AccountSerializer(account, many=False)
    return JsonResponse({'message': 'account created successfully', 'account': accountSerializer.data})


def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})
