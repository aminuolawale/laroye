from django.contrib.auth import get_user_model
import requests
from .models import SocialAccount
from django.conf import settings
from datetime import datetime

User = get_user_model()


class TwitterAPIAdapter:
    def __init__(self, username: str) -> None:
        self.username = username
        self.endpoint = "users/by"
        self.fields = ["id", "created_at"]

    def get_url(self):
        return f"{settings.TWITTER_API_URL}/{self.endpoint}?usernames={self.username}&user.fields={','.join(self.fields)}"

    def fetch_user_account(self) -> dict:
        url = self.get_url()
        try:
            response = requests.get(
                url,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {settings.TWITTER_API_BEARER_TOKEN}",
                },
            )
            response_data = response.json().get("data")
            if type(response_data) != list or len(response_data) == 0:
                raise Exception("Could not retrieve social account details")
            return response_data[0]
        except:
            raise Exception("Could not retrieve social account details")

    def fetch_and_prepare_social_account_data(self):
        raw_user_account_data = self.fetch_user_account
        return dict()

    def import_data(self):
        user_account = self.get_user_account()
        print(user_account)
        user_id = user_account.get("id")
        created_at = user_account.get("created_at")
        url = f"{settings.TWITTER_API_URL}/users/{user_id}/tweets?start_time={created_at}&tweet.fields=created_at&max_results=20"

        try:
            print(url)
            response = requests.get(
                url,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {settings.TWITTER_API_BEARER_TOKEN}",
                },
            )
            response_data = response.json().get("data")
            if type(response_data) != list or len(response_data) == 0:
                raise Exception("Could not retrieve social account data")
            return response_data
        except:
            raise Exception("Could not retrieve social account data")


class SocialAccountService:
    def __init__(
        self,
        user: User,
        username: str,
        provider: str,
    ) -> None:
        self.user = user
        self.username = username
        self.provider = provider

    def get_user_social_account(self):
        adapter_class = self.get_provider_adapter()
        adapter = adapter_class(self.username)
        user_account = None
        try:
            user_account = adapter.get_user_account()
            return user_account
        except:
            return None

    def create_user_social_account(self):
        data = self.get_user_social_account()
        if not data:
            return None
        account_created_date = datetime.strptime(
            data.get("created_at"), settings.TWITTER_TWEET_CREATED_AT_TIME_FORMAT)
        account_user_id = int(data.get("id"))
        return SocialAccount.objects.create_social_account(
            user=self.user,
            provider=self.provider,
            username=data.get("username"),
            account_user_id=account_user_id,
            account_created_date=account_created_date,
        )

    def get_provider_adapter(self):
        adapters = dict(twitter=TwitterAPIAdapter)
        return adapters.get(self.provider)

    def import_data(self):
        adapter_class = self.get_provider_adapter()
        adapter = adapter_class(self.username)
        try:
            return adapter.import_data()
        except:
            return []
