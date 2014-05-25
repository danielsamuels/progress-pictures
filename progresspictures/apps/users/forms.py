from django import forms
from django.forms import extras
from django.utils.timezone import now

from .models import User


class UserCreationForm(forms.ModelForm):

    date_of_birth = forms.DateField(
        widget=extras.SelectDateWidget(
            years=range(now().year, 1900, -1)
        ),
        required=False,
    )

    password1 = forms.CharField(
        label="Password",
        widget=forms.PasswordInput
    )

    password2 = forms.CharField(
        label="Password confirmation",
        widget=forms.PasswordInput,
        help_text="Enter the same password as above, for verification."
    )

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data.get("password1"))

        if commit:
            user.save()
        return user

    class Meta:
        model = User
        exclude = ['last_login']
        fields = ['first_name', 'last_name', 'email', 'date_of_birth', ]
