
import fasttext
import os
from django.conf import settings


class ActionsService:
    def __init__(self, data) -> None:
        self.data = data


    def evaluate(self):
        if self.data.get("model") == "fast-text":
            fasttext_model_path = os.path.join(settings.AI_MODELS_DIR, settings.FASTTEXT_MODEL_NAME)
            model = fasttext.load_model(fasttext_model_path)
            if self.data.get("action") == "Validation":
                result = model.predict(self.data.get('text'))
                return 'YES' if result[0][0] == '__label__yes' else "NO"
        return None

