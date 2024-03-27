from django.shortcuts import render
from django.http import HttpResponse
from random import randint

from firstapp.forms import NewUserForm


def index(request):
    name = ("Иван", "Доберман")
    birth = (30, 2, 1999)

    data = {
        "name": name,
        "birth": birth,
    }

    return render(request, "firstapp/index.html", context=data)
    # return HttpResponse("Hello, World! Мой первый проект на Django!")


def newuser(request):
    if request.method == "POST":
        user_id = request.POST.get("num")
        user_name = request.POST.get("name")
        user_lname = request.POST.get("lname")

        output = f"""
<h2>Пользователь:</h2>
<h3>ID: {user_id}</h3>
<h3>Имя: {user_name}</h3>
<h3>Фамилия: {user_lname}</h3>
"""
        return HttpResponse(output)
    else:
        newuserform = NewUserForm()

    return render(request, "firstapp/newuser.html", {"form": newuserform})


def about(request):
    s = """
<h1>О проекте</h1> 

<h2>Это мой первый проект на Django</h2>

<p align="justify">
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
<p>
"""
    return HttpResponse(s)


def req(request):
    s = f"""
<p>scheme: схема запроса (http или https)</p>
<p>{request.scheme}</p>
<p>body: представляет тело запроса в виде строки байтов</p>
<p>{request.body}</p>
<p>path: представляет путь запроса</p>
<p>{request.path}</p>
<p>method: метод запроса (GET, POST, PUT и т.д.)</p>
<p>{request.method}</p>
<p>encoding: кодировка</p>
<p>{request.encoding}</p>
<p>content_type: тип содержимого запроса (значение заголовка CONTENT_TYPE)</p>
<p>{request.content_type}</p>
<p>GET: объект в виде словаря, который содержит параметры запроса GET</p>
<p>{request.GET}</p>
<p>POST: объект в виде словаря, который содержит параметры запроса POST</p>
<p>{request.POST}</p>
<p>COOKIES: отправленные клиентом куки</p>
<p>{request.COOKIES}</p>
<p>FILES: отправленные клиентом файлы</p>
<p>{request.FILES}</p>
<p>META: хранит все доступные заголовки http в виде словаря. </p>
<p>{request.META}</p>
<p>.get_full_path(): возвращает полный путь запроса, включая строку запроса</p>
<p>{request.get_full_path()}</p>
<p>get_host(): возвращает хост клиента<\p>
<p>{request.get_host()}</p>
<p>get_port(): возвращает номер порта<\p>
<p>{request.get_port()}</p>
"""

    return HttpResponse(s)


def random(request):
    res = "Орел" if randint(0, 1) == 1 else "Решка"
    s = f"""
<h1>Бросим монетку?</h2>

<h3>Результат броска: "{res}"</h3>
"""
    return HttpResponse(s)


def myname(request, name):
    s = f"""
<h1>Скажите, как его зовут?</h1>

<h2>Меня зовут {name}.</h2>
<h2>Будем знакомы!</h2>
"""
    return HttpResponse(s)


def users(request, username):
    s = f"""
<h1>Пользовательская страница</h1>

<h3>User: {username}</h3>

"""
    return HttpResponse(s)


def products(request):
    product_id = request.GET.get("id")
    name = request.GET.get("name")
    s = f"""
<h1>Страница товара</h1>

<h3>Prod ID: {product_id}</h3>
<h3>Prod Name: {name}</h3>

"""
    return HttpResponse(s)
