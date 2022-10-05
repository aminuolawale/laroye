from typing import List
from django.urls import path, include
from .api import UserAccountAPI, ImportSocialAccountData, LinkSocialAccountAPI

urlpatterns: List[path] = [
    path("account/", UserAccountAPI.as_view(), name="user_account"),
    path(
        "link-social-account/",
        LinkSocialAccountAPI.as_view(),
        name="user_link_social_account",
    ),
    path("import-social-data/", ImportSocialAccountData.as_view(), name="import"),
]
