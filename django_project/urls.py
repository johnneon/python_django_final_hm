"""
URL configuration for django_project project.

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
from django.urls import path

from bunker import views as bunker_views

urlpatterns = [
    path("", bunker_views.index, name="home"),
    path("/accounts", bunker_views.accounts, name="accounts"),
    path("/accounts/action", bunker_views.accounts_action, name="accounts_action"),
    path("/bunker", bunker_views.bunker, name="bunker"),
    path("/bunker/action", bunker_views.bunker_action, name="bunker_action"),
    path("admin/", admin.site.urls),
]
