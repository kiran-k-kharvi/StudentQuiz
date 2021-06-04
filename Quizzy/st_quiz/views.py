from django.http.response import HttpResponse
from django.shortcuts import render
from django.utils.translation import ugettext_lazy as _

# Create your views here.
def test(request):
    return HttpResponse(_("hello"))