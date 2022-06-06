from datetime import datetime

import dateutil.relativedelta as rel
import pandas as pd
from newsapi import NewsApiClient
import re
import os

from textblob import TextBlob

from dotenv import load_dotenv

load_dotenv()

sentiment_key = os.getenv("NEWS_API_SECRET")

newsapi = NewsApiClient(api_key=sentiment_key)


def sentiment(coin):
    now = datetime.now()
    then = now + rel.relativedelta(months=-1)

    now = now.date()
    then = then.date()

    all_articles = newsapi.get_everything(
        q=coin,
        from_param=then,
        to=now,
        language="en",
        sort_by="relevancy",
    )

    news = pd.DataFrame(all_articles["articles"])

    def cleanTxt(text):
        text = re.sub('@[A-Za-z0–9]+', '', text)
        text = re.sub('#', '', text)
        text = re.sub('RT[\s]+', '', text)
        text = re.sub('https?:\/\/\S+', '', text)

        return text

    news['description'] = news['description'].apply(cleanTxt)

    # def getSubjectivity(text):
    #     return TextBlob(text).sentiment.subjectivity

    def getPolarity(text):
        return TextBlob(text).sentiment.polarity

    news['Polarity'] = news['description'].apply(getPolarity)

    def getAnalysis(score):
        if score < 0:
            return 'Negative'
        elif score == 0:
            return 'Neutral'
        else:
            return 'Positive'

    news['Analysis'] = news['Polarity'].apply(getAnalysis)

    news = news[['publishedAt', 'Polarity', 'Analysis']]

    return news
