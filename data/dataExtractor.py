import praw
from praw.models import MoreComments
import json
import time


reddit = praw.Reddit(client_id="TA_VSbjQ6EIiBQ",
                     client_secret="LGXVe-Kc623A4nvDhV3_MsmW04k",
                     user_agent="Reddit Scraper",
                     username="justherefortheapi", 
                     password="rhic_yaik6NON!scey" 
)

# Creation of reddit instance
# Actual login info should NOT be on Github

wsb = reddit.subreddit("wallstreetbets")
inv = reddit.subreddit("investing")
secan = reddit.subreddit("SecurityAnalysis")
stocks = reddit.subreddit("stocks")
opt = reddit.subreddit("options")
rbh = reddit.subreddit("robinhood")
cdi = reddit.subreddit("CanadianInvestor")
bsb = reddit.subreddit("Baystreetbets")

subreddits = [wsb, inv, secan, stocks, opt, rbh, cdi, bsb]

# List of subreddits to check comments from.


massComments = []

# This list will hold on comments.


for subreddit in subreddits:
    for submission in subreddit.hot(limit=50):
        submission.comments.replace_more(limit=None)
        for comment in submission.comments.list():
            massComments.append(comment.body)

 # Above code gets all comments from the top 50 submissions of the day from the subreddits.
 # This a compromise. Ideally it would cover daily top 100.


with open("comments.txt", "w") as text_file:
    for comment in massComments:
        text_file.write(comment)