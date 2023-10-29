from django.http import JsonResponse
from .views_auth import get_user_id_from_request

from ..models import User, Account
from ..serializers import *


def get_user(request):
    user_id = get_user_id_from_request(request)
    user = User.objects.get(id=user_id)
    userSerializer = UserSerializer(
        user, context={'request': request}, many=False)
    return JsonResponse({'user': userSerializer.data})


def get_user_accounts(request):
    user_id = get_user_id_from_request(request)
    user = User.objects.get(id=user_id)
    accounts = Account.objects.filter(user=user)
    accountSerializer = AccountSerializer(accounts, many=True)
    return JsonResponse({'accounts': accountSerializer.data})
