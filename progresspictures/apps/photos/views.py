from .models import Category
from .serializers import CategorySerializer

from rest_framework import viewsets


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    model = Category

    def get_queryset(self):
        return Category.objects.filter(
            user=self.request.user,
        ).extra(
            select={
                'lower_name': 'lower(name)'
            }
        ).order_by('lower_name')

    def pre_save(self, obj):
        obj.user = self.request.user
