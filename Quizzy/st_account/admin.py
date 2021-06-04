from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from st_account.models import StudentAccount
# Register your models here.

class StAccountAdmin(UserAdmin):
    list_display=('email','username','date_joined','last_login','is_admin','is_staff')
    search_fields = ('email','username')
    readonly_fields = ('last_login','date_joined')

    filter_horizontal=()
    list_filter = ()
    fieldsets = ()

admin.site.register(StudentAccount,StAccountAdmin)