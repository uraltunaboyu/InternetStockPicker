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
 
with open("comments.txt", "w") as text_file:
    for comment in massComments:
        text_file.write(comment)