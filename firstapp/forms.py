from django import forms


class NewUserForm(forms.Form):
    num = forms.IntegerField(label="ID: ")
    name = forms.CharField(label="Имя: ")
    lname = forms.CharField(label="Фамилия: ")
