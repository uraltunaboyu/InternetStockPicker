import praw
from praw.models import MoreComments
import json


reddit = praw.Reddit(client_id="TA_VSbjQ6EIiBQ",
                     client_secret="LGXVe-Kc623A4nvDhV3_MsmW04k",
                     user_agent="Reddit Scraper",
                     username="justherefortheapi", 
                     password="rhic_yaik6NON!scey" 
)

wsb = reddit.subreddit("wallstreetbets")
inv = reddit.subreddit("investing")
secan = reddit.subreddit("SecurityAnalysis")
stocks = reddit.subreddit("stocks")
opt = reddit.subreddit("options")
rbh = reddit.subreddit("robinhood")
cdi = reddit.subreddit("CanadianInvestor")
bsb = reddit.subreddit("Baystreetbets")

subreddits = [wsb, inv, secan, stocks, opt, rbh, cdi, bsb]

massComments = []

for subreddit in subreddits:
   for submission in subreddit.hot(limit=25):
        submission.comments.replace_more(limit=None)
        for comment in submission.comments.list():
            massComments.append(comment.body)
 
json_string = json.dumps(massComments)


with open('comments.json', 'w') as f:
    json.dump(json_string, f)