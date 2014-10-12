from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from django.db import IntegrityError
from django.http import HttpResponse
from django.shortcuts import redirect
from django.views.generic import View

from .models import User
from .serializers import UserSerializer
from ...utils.responses import JSONResponse

from rest_framework import viewsets

import json


class AuthView(View):

    def post(self, request, *args, **kwargs):
        if 'HTTP_AUTHORIZATION' in request.META:
            email, password = request.META['HTTP_AUTHORIZATION'].split(':')

            user = authenticate(username=email, password=password)

            if user is not None:
                if user.is_active:
                    django_login(request, user)
                    request.user = user

                    # Once we have logged the user in return the serialized response
                    serializer = UserSerializer(request.user, context={'request': request})
                    return JSONResponse(serializer.data)

        # They did not provide basic authentication
        response = HttpResponse()
        response.status_code = 401
        return response

    def put(self, request, *args, **kwargs):
        data = json.loads(request.raw_post_data)
        user = User(**data)
        user.set_password(data['password'])

        try:
            user.save()
            user = authenticate(username=data['email'], password=data['password'])
            if user is not None:
                if user.is_active:
                    django_login(request, user)
                    request.user = user

                    # Once we have logged the user in return the serialized response
                    serializer = UserSerializer(request.user)
                    response = JSONResponse(serializer.data)
                    response.status_code = 201
                    return response

        except IntegrityError:
            pass

        response = HttpResponse()
        response.status_code = 409
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
