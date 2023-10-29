from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Account(models.Model):
    SAVINGS = "SA"
    CHECKING = "CH"
    ACCOUNT_TYPE_CHOICES = [
        (SAVINGS, 'Savings'),
        (CHECKING, 'Checking')
    ]
    name = models.CharField(max_length=255)
    account_type = models.CharField(max_length=8,
                                    choices=ACCOUNT_TYPE_CHOICES,
                                    default='Checking')
    balance = models.FloatField()
    account_number = models.CharField(max_length=12)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
