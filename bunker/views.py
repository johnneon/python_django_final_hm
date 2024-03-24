from django.shortcuts import render

from bunker.forms import NewUserForm


# Create your views here.
def index(request):
    data = {
        'help_page_path': '/homework/accounts',
    }
    return render(request, 'bunker/index.html', context=data)


def accounts(request):
    newuserform = NewUserForm()
    return render(request, 'bunker/accounts.html', context={'form': newuserform})


def bunker(request):
    return render(request, 'bunker/bunker.html')
