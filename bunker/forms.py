from django import forms


class NewUserForm(forms.Form):
    login = forms.TimeField(label="Login: ")
