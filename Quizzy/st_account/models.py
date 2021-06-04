from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager



# Create your models here.


class StdAccountManager(BaseUserManager):
    def create_user(self,email,username,password):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have an user name")
        if not password:
            raise ValueError("Users must have an password")
        
        user = self.model(
            email=self.normalize_email(email),
            username = username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,email,username,password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

        





class StudentAccount(AbstractBaseUser):
    email       = models.EmailField(verbose_name="Email",unique=True,max_length=60)
    username   = models.CharField(verbose_name="User Name",unique=True,max_length=60)
    password    = models.CharField(verbose_name='Password', max_length=128)
    date_joined = models.DateTimeField(verbose_name="Date Joined",auto_now_add=True)
    last_login  = models.DateTimeField(verbose_name="Last Login", auto_now=True)
    is_admin    = models.BooleanField(default=False)
    is_staff    = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active   = models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username",]

    objects = StdAccountManager()

    def __str__(self):
        return self.email
    
    def has_perm(self,perm,obj=None):
        return self.is_active
    
    def has_module_perms(self,app_lable):
        return True
