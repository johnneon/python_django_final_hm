import json

from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from bunker.forms import NewUserForm
from bunker.models import database


# Create your views here.
def index(request):
    context = {
        'help_page_path': '/homework/accounts',
    }
    return render(request, 'bunker/index.html', context=context)


def accounts(request):
    if request.method == "POST":
        login = request.POST.get("login")
        # todo add else statement
        if database.create_owner(login):
            return HttpResponseRedirect(f"/homework/bunker?user={login}")

    new_user_form = NewUserForm()
    users = database.get_users()
    context = {
        'form': new_user_form,
        'users': users
    }
    return render(request, 'bunker/accounts.html', context=context)


@csrf_exempt
def accounts_action(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        action = body['action']
        user = body['user']

        if action == 'delete':
            database.delete_owner(user)

    return HttpResponse()


def bunker(request):
    return render(request, 'bunker/bunker.html')
