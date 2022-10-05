from .celery import app
from users.models import SocialAccount



@app.task
def import_data(social_account_id: int):
    social_account = SocialAccount.objects.get(social_account_id)
    