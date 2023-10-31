import json
from django.http import JsonResponse
from rest_framework.decorators import api_view

from nanoid import generate
from bankapplication.views.views_auth import get_user_id_from_request
from ..models import Account
from ..serializers import *


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


def transfer_funds(request):
    data = json.loads(request.body)
    transfer_amount = data['amount']
    transfer_from = Account.objects.get(
        account_number=data['transferFrom'])
    transfer_to = Account.objects.get(
        account_number=data['transferTo'])

    newTransferFromBalance = transfer_from.balance - transfer_amount
    newTransferToBalance = transfer_to.balance + transfer_amount
    if (newTransferFromBalance < 0):
        return JsonResponse({'message': 'failed transfer.  Insufficient funds'})

    transfer_from.balance = newTransferFromBalance
    transfer_from.save()
    transfer_to.balance = newTransferToBalance
    transfer_to.save()

    return JsonResponse({'New Balances': {
        transfer_from.name: transfer_from.balance,
        transfer_to.name: transfer_to.balance
    }})


def money_tree(request):
    data = json.loads(request.body)
    amount = data['amount']
    if (amount < 0):
        return JsonResponse({'message': 'failed operation. transfer amount must be positive.'})

    account = Account.objects.get(account_number=data['account_number'])

    newAccountBalance = account.balance + amount
    account.balance = newAccountBalance
    account.save()

    return JsonResponse({'New Balance': account.balance})
