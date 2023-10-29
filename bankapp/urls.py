"""
URL configuration for bankapp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from bankapplication.views import views, views_auth, views_banking
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/get_csrf_token/', views_auth.get_csrf_token),
    path('api/create_user/', views_auth.create_user),
    path('api/create_account/', views_auth.create_account),
    path('api/get_user/', views.get_user),
    path('api/get_user_accounts', views.get_user_accounts),
    path('api/transfer_funds/', views_banking.transfer_funds),
    path('api/money_tree/', views_banking.money_tree),
    # path('', TemplateView.as_view(template_name='index.html')),
    path('', include('render.urls')),
]
