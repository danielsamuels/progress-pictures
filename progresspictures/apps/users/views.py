from django.conf import settings
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import redirect
from django.views.generic import CreateView, FormView

from .forms import UserCreationForm


class Registration(CreateView):
    form_class = UserCreationForm
    template_name = "auth/registration.html"

    def form_valid(self, form):
        self.object = form.save()

        user = authenticate(
            username=form.cleaned_data.get('email_address'),
            password=form.cleaned_data.get('password')
        )

        login(self.request, user)

        return redirect(self.get_success_url())

    def get_success_url(self):
        return settings.LOGIN_REDIRECT_URL

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            return redirect(settings.LOGIN_REDIRECT_URL)
        else:
            return super(Registration, self).dispatch(request, *args, **kwargs)


class Login(FormView):
    form_class = AuthenticationForm
    template_name = "auth/login.html"

    def form_valid(self, form):
        login(self.request, form.get_user())

        return super(Login, self).form_valid(form)

    def get_success_url(self):
        return settings.LOGIN_REDIRECT_URL

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            return redirect(settings.LOGIN_REDIRECT_URL)
        else:
            return super(Login, self).dispatch(request, *args, **kwargs)
