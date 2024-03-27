import json

from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from bunker.forms import NewUserForm
from bunker.models import database


# Create your views here.
def index(request):
    context = {
        "help_page_path": "/homework/accounts",
    }
    return render(request, "bunker/index.html", context=context)


def accounts(request):
    if request.method == "POST":
        login = request.POST.get("login")
        # todo add else statement
        if database.create_owner(login):
            return HttpResponseRedirect(f"/homework/bunker?user={login}")

    new_user_form = NewUserForm()
    users = database.get_users()
    context = {"form": new_user_form, "users": users}
    return render(request, "bunker/accounts.html", context=context)


@csrf_exempt
def accounts_action(request):
    if request.method == "POST":
        body_unicode = request.body.decode("utf-8")
        body = json.loads(body_unicode)
        action = body["action"]
        user = body["user"]

        if action == "delete":
            database.delete_owner(user)

    return HttpResponse()


def bunker(request):
    user = request.GET.get("user")
    context = {"rows": database.get(user)}
    return render(request, "bunker/bunker.html", context=context)


@csrf_exempt
def bunker_action(request):
    if request.method == "POST":
        body_unicode = request.body.decode("utf-8")
        body = json.loads(body_unicode)
        action = body["action"]
        section = body["section"]
        prev_section_name = body.get("prev_section_name", "")
        login = body.get("login", "")
        prev_login = body.get("prev_login", "")
        password = body.get("password", "")
        user = body.get("user", "")

        if action == "create_section":
            database.create_section(user, section)
        elif action == "update_section":
            database.update_section(user, section, prev_section_name)
        elif action == "remove_section":
            database.delete_section(user, section)
        elif action == "create_field":
            database.create_section_field(user, section, login, password)
        elif action == "update_field":
            database.update_section_field(user, section, login, password, prev_login)
        elif action == "remove_field":
            database.delete_section_field(user, section, login)

    return HttpResponse()
