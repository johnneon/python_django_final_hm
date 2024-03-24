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
from django.urls import path, re_path

from firstapp import views
from bunker import views as bunker_views

urlpatterns = [
    path('homework', bunker_views.index),
    path('homework/accounts', bunker_views.accounts),
    path('homework/accounts/action', bunker_views.accounts_action),
    path('homework/bunker', bunker_views.bunker),

    path("admin/", admin.site.urls),
    path('', views.index, name='home'),
    path('users/<str:username>/', views.users),
    path('products/', views.products),
    path('newuser/', views.newuser),
    re_path(r'^about', views.about, name='about'),
    re_path('^req', views.req, name='requests'),
    re_path('^random', views.random, name='random'),
    re_path(r'^myname', views.myname, kwargs={'name': 'Иван Доберман'}, name='myname'),
]
