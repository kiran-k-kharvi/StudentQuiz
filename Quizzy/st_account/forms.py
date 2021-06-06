from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.forms import UserCreationForm
from django.db import models
from django.forms import fields

from st_account.models import StudentAccount


class StRegeistrationForm(UserCreationForm):
    email = forms.EmailField(max_length=60)
    class Meta:
        model = StudentAccount
        fields = ("email","username","password1","password2")
        
class StAuthenticationForm(forms.ModelForm):
    class Meta:
        model=StudentAccount
        fields=('email','password')

    def clean(self):
        email = self.cleaned_data['email']
        password = self.cleaned_data['password']
        if not authenticate(email=email,password=password):
            raise forms.ValidationError("Invalid login credentials")