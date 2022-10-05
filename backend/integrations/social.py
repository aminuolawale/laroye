from typing import Dict, Optional, Tuple
from django.conf import settings
from .base import RestAPIMixin
from pyrfc3339 import generate as to_3339

        

class TwitterAPI(RestAPIMixin):
    def __init__(self, data:Dict) -> None:
       self.data = data

    def fetch_user_account(self) -> Tuple[bool, Dict]: 
        url = self._get_fetch_user_account_url()
        request_success, response_data = self.rest_get(url, self._get_headers())
        if not request_success:
            return False, None
        validation_success, user_account = self._validate_fetch_user_account_response(response_data)
        return validation_success, user_account
        
    def fetch_tweets(self):
        url = self._get_fetch_tweets_url()
        request_success, response_data = self.rest_get(url, self._get_headers())
        if not request_success:
            return False, None
        validation_success, tweets = self._validate_tweets_response(response_data)
        return validation_success, tweets

    
    def _validate_fetch_user_account_response(self, data) -> Tuple[bool, Optional[Dict]]:
        result_field = "data"
        result = data.get(result_field)
        if type(result) != list or len(result) == 0:
            return False, None
        return True, result[0]

    def _validate_tweets_response(self, data) -> Tuple[bool, Optional[Dict]]:
        result_field = "data"
        result = data.get(result_field)
        if type(result) !=list or len(result) == 0:
            return False, None
        return True, result

    def _get_fetch_user_account_url(self):
        return f"{self._get_base_url()}/{self._get_fetch_user_account_endpoint()}?{self._get_fetch_user_account_query_string()}"

    def _get_fetch_user_account_endpoint(self):
        return 'users/by'

    def _get_fetch_user_account_query_string(self):
        user_account_fields = ["id", "created_at"]
        user_account_fields_string = ".".join(user_account_fields)
        username =self.data.get("username")
        return f'usernames={username}&user.fields={user_account_fields_string}'

    def _get_fetch_tweets_url(self):
        return f"{self._get_base_url()}/{self._get_fetch_tweets_endpoint()}?{self._get_fetch_tweets_query_string()}"

    def _get_fetch_tweets_endpoint(self):
        user_id =self.data.get("account_user_id")
        return f'users/{user_id}/tweets'

    def _get_fetch_tweets_query_string(self):
        created_at = to_3339(self.data.get("created_at"))
        return f'start_time={created_at}&tweet.fields=created_at&max_results=20'

    def _get_base_url(self):
        return settings.TWITTER_API_URL

    def _get_headers(self):
        return {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {settings.TWITTER_API_BEARER_TOKEN}",
        }



SOCIAL_API_MAPPING = {
    "twitter": TwitterAPI
}