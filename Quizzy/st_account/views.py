import requests
from django.shortcuts import render,redirect
from django.contrib.auth import login,authenticate, logout
from django.contrib.auth.decorators import login_required
from st_account.forms import StRegeistrationForm,StAuthenticationForm
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
    context= {}
    user = request.user
    if user.is_authenticated:
        return redirect("home")
    
    if request.POST:
        login_form = StAuthenticationForm(request.POST)
        if login_form.is_valid():
            email = login_form.cleaned_data.get('email')
            password = login_form.cleaned_data.get('password')
            user = authenticate(email=email,password=password)
            if user:
                login(request,user)
                return redirect("home")
        else:
            context['login_form']=login_form
            return render(request,'st_account/login.html',context=context)
    else:
        login_form = StAuthenticationForm()
        context['login_form']=login_form
        return render(request,'st_account/login.html',context=context)


def logout_user(request):
    logout(request)
    return redirect('home')


@login_required
def test(request,id):
    context={}
    url = "https://opentdb.com/api.php"
    get_question_set = requests.get(url,params={"amount":"10","category":id,"difficulty":"easy","type":"multiple"})
    print(get_question_set.json()) 
    json_result = get_question_set.json()
    final_result = []
    for each in json_result['results']:
        temp = {}
        temp['answers'] =[]
        for k,v in each.items():
            if k in ["question","incorrect_answers","correct_answer"]:
                if k in ["incorrect_answers","correct_answer"]:
                    if k == "incorrect_answers":
                        for ans in v:
                            temp['answers'].append(ans)
                    else:
                        temp['answers'].append(v)
                if k == "correct_answer":
                    temp["correct_answer"] = v
                if k == "question":
                    temp["question"] = v
        final_result.append(temp)
    context["question_set"] = final_result
    return render(request,'test_page/test.html',context=context)

@login_required
def home(request):
    return render(request,'home/landing.html')