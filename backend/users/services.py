from django.contrib.auth import get_user_model
from integrations.databases import DataWarehouse
from .models import SocialAccount
from integrations.social import SOCIAL_API_MAPPING
from typing import Dict
User = get_user_model()

class SocialService:
    def __init__(self, data: Dict) -> None:
        self.username = data.get("username")
        self.provider = data.get("provider")
        self.created_at = data.get("created_at")
        self.account_user_id = data.get("account_user_id")
        social_account_id = data.get("social_account_id")
        if social_account_id:
            social_account: SocialAccount = SocialAccount.objects.get(
                social_account_id)
            self.username = self.username or social_account.username
            self.provider = self.provider or social_account.provider
            self.created_at = self.created_at or social_account.account_created_date
            self.account_user_id = self.account_user_id or social_account.account_user_id

    def create_user_social_account(self):
        external_social_account_data = self._get_user_social_account()
        if external_social_account_data is None:
            return None
        username = external_social_account_data.get("username")
        account_user_id = external_social_account_data.get("id")
        account_created_date = external_social_account_data.get("created_at")
        return SocialAccount.objects.create_social_account(user=self.user, provider=self.provider, username=username, account_user_id=account_user_id, account_created_date=account_created_date)

    def import_data(self, resource):
        provider_adapter_class = self._get_provider_adapter()
        user_data = dict(username=self.username, account_user_id=self.account_user_id,
                         created_at=self.created_at)
        provider_adapter = provider_adapter_class(user_data)
        resource_method = getattr(provider_adapter, f"fetch_{resource}")
        data = resource_method()
        warehouse = DataWarehouse()
        return warehouse.import_data(data)

    def _get_user_social_account(self):
        adapter_class = self._get_provider_adapter()
        adapter_class_args = dict(username=self.username)
        adapter = adapter_class(adapter_class_args)
        _, result = adapter.fetch_user_account()
        return result

    def _get_provider_adapter(self):
        return SOCIAL_API_MAPPING.get(self.provider)
