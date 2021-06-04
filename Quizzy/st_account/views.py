from django.shortcuts import render,redirect
from django.contrib.auth import forms, login,authenticate
from st_account.forms import StRegeistrationForm
# Create your views here.

def register_user(request):
    context ={}
    if request.POST:
        reg_form = StRegeistrationForm(request.POST)
        if reg_form.is_valid():
            reg_form.save()
            email = reg_form.cleaned_data.get('email')
            raw_password = reg_form.cleaned_data.get('password1')
            st_user = authenticate(email=email,password=raw_password)
            login(request,st_user)
            print("yes")
            return redirect('home')
        else:
            context['register_form'] = reg_form

    else:
        reg_form = StRegeistrationForm()
        context['register_form'] = reg_form
    return render(request,'st_account/register.html',context=context)


def login_user(request):
    return render(request,'st_account/login.html')

def home(request):
    return render(request,'base/base.html')