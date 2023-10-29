import json
from django.http import JsonResponse
from ..models import Account
from ..serializers import *


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
