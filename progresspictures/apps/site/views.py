from django.conf import settings
from django.shortcuts import redirect
from django.views.generic import TemplateView


class HomepageView(TemplateView):
    template_name = 'homepage.html'

    def dispatch(self, request, *args, **kwargs):

        if not request.user.is_authenticated():
            return redirect(settings.LOGIN_URL)

        return super(HomepageView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(HomepageView, self).get_context_data(**kwargs)

        context['categories'] = [
            {
                'name': 'Front shots',
                'images': [1, 2, 3, 4, 5, 6, 7, 8]
            },
            {
                'name': 'Side shots',
                'images': [1, 2, 3, 4, 5, 6, 7, 8]
            },
            {
                'name': 'Quirky images',
                'images': [1, 2, 3, 4, 5, 6, 7, 8]
            },
            {
                'name': 'Other things',
                'images': [1, 2, 3, 4, 5, 6, 7, 8]
            },
            {
                'name': 'Other things',
                'images': [1, 2, 3, 4, 5, 6, 7, 8]
            },
            {
                'name': 'Other things',
                'images': [1, 2, 3, 4, 5, 6, 7, 8]
            },
            {
                'name': 'Other things',
                'images': [1, 2, 3, 4, 5, 6, 7, 8]
            },
            {
                'name': 'Other things',
                'images': [1, 2, 3, 4, 5, 6, 7, 8]
            }
        ]

        return context
