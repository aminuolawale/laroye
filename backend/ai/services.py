
import fasttext
import os
from django.conf import settings




ACTION_MODEL_MAP = {
    "VALIDATION": "FASTTEXT_VALIDATION_MODEL",
    "TOPIC": "FASTTEXT_TOPIC_MODEL",
    
    "SENTIMENT": 'FASTTEXT_SENTIMENT_MODEL'
}

VALIDATION_MAP = {
    "__label__yes": 'YES',
    "__label__no": 'NO'
}

SENTIMENT_MAP = {
    "__label__positive": 'POSITIVE',
    "__label__neutral": 'NEUTRAL',
    "__label__negative": 'NEGATIVE'}

class ActionsService:
    def __init__(self, data) -> None:
        self.data = data
        self.action = self.data.get("action")
        fasttext_model_path = os.path.join(settings.AI_MODELS_DIR, getattr(settings, ACTION_MODEL_MAP.get(self.action)))
        self.model = fasttext.load_model(fasttext_model_path)


    def evaluate(self):
        texts = [item.get("text") for item in self.data.get("payload")]
        temp_results = self.get_handler(self.action)(texts)
        result = [dict(id=item.get("id"), text=item.get("text"), result=result) for (item, result) in zip(self.data.get("payload"), temp_results)]
        return result

    def get_handler(self, action):
        handler_name = f"do_{action.lower()}"
        handler = getattr(self, handler_name)
        return handler

    def do_validation(self, items):
        return [VALIDATION_MAP.get(self.model.predict(text)[0][0]) for text in items]

    def do_sentiment(self, items):
        return [SENTIMENT_MAP.get(self.model.predict(text)[0][0]) for text in items]
        

    def do_topic(self, items):
        return[self.model.predict(text)[0][0].split("__")[-1].upper() for text in items]