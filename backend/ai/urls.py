from django.urls import path
from .api import ActionsView

urlpatterns = [
    path('', ActionsView.as_view(), name='actions')
]