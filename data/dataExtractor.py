import praw

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


for subreddit in subreddits:
   for submission in subreddit.hot(limit=10):
        all_comments = submission.comments.list()
        for entry in all_comments:
           comment = reddit.comment(entry)
           print(comment.body)

