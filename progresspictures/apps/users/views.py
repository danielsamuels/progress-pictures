from django.contrib.auth import authenticate, login as django_login, logout as django_logout, \
    get_user_model
from django.db import IntegrityError
from django.http import HttpResponse, QueryDict
from django.shortcuts import redirect
from django.views.generic import View

from .models import User
from .serializers import UserSerializer
from ...utils.responses import JSONResponse

from rest_framework import viewsets

import json


class AuthView(View):

    def post(self, request, *args, **kwargs):
        post_data = json.loads(request.body)
        email = post_data.get('email')
        password = post_data.get('password')
        status = None

        # Check to see if a User exists with the email address, if it doesn't,
        # then we'll register it right here.
        UserModel = get_user_model()
        try:
            user = UserModel._default_manager.get_by_natural_key(email)
            status = 'existed'
        except UserModel.DoesNotExist:
            # Create the user.
            user = UserModel(email=email)
            user.set_password(password)
            user.save()
            status = 'created'

        user = authenticate(username=email, password=password)

        if user is not None:
            if user.is_active:
                django_login(request, user)
                request.user = user

                # Once we have logged the user in return the serialized response
                serializer = UserSerializer(request.user, context={'request': request})
                serializer.data['status'] = status
                return JSONResponse(serializer.data)

        # They did not provide basic authentication
        response = HttpResponse()
        response.status_code = 401
        return response

    def delete(self, request, *args, **kwargs):
        django_logout(request)
        return redirect('/')


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(
            user=self.request.user,
        )
