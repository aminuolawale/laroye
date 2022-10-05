from typing import List
from django.contrib import admin
from django.urls import path,  include, re_path
from django.views.generic import TemplateView

urlpatterns: List[path] = [
    # re_path(r"^(?:.*)/?$", TemplateView.as_view(template_name="build/index.html")),
    path('admin/', admin.site.urls),
    path("api/users/", include("users.urls")),
]
