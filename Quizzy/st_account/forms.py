from django import forms
from django.contrib.auth.forms import UserCreationForm

from st_account.models import StudentAccount


class StRegeistrationForm(UserCreationForm):
    email = forms.EmailField(max_length=60)
    class Meta:
        model = StudentAccount
        fields = ("email","username","password1","password2")
        