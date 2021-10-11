const Twitter = require('twit');
const { validationResult } = require('express-validator');

const Tweet = require('../models/tweet');
const TwitterSettings = require('../models/twitter-settings');

const twitter_config = require('../config').twitter;
const twitter_client = new Twitter({
  consumer_key: twitter_config.consumer_key,
  consumer_secret: twitter_config.consumer_secret,
  app_only_auth: true
});

exports.getSettings = (req, res, next) => {
  TwitterSettings.find()
    .then(settings => {
      res.status(200).json(settings);
    })
    .catch(err => {
      const error =  new Error(err);
      error.status = 401;
      error.msg = 'Unknown error occured.';
      return next(error);
    });
};

exports.postSettings = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      const error =  new Error('Invalid input.');
      error.status = 422;
      error.msg = 'Invalid input.';
      error.errors = errors.array();
      return next(error);
  }
  const settings = new TwitterSettings();
  settings.tweet_count = req.body.tweet_count;
  settings.save()
    .then(() => {
      res.status(201).json({
        msg: 'Settings added successfully.',
        _id: settings._id
      });
    })
    .catch(err => {
      const error =  new Error(err);
      error.status = 401;
      error.msg = 'Unknown error occured.';
      return next(error);
    });
};

exports.putSettings = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      const error =  new Error('Invalid input.');
      error.status = 422;
      error.msg = 'Invalid input.';
      error.errors = errors.array();
      return next(error);
  }
  const settings = {
    tweet_count: req.body.tweet_count
  };
  TwitterSettings.updateOne({
      _id: req.body._id
    }, settings)
    .then(result => {
      res.status(200).json({
        msg: 'Twitter settings updated successfully.',
        result: result
      });
    })
    .catch(err => {
      const error =  new Error(err);
      error.status = 401;
      error.msg = 'Unknown error occured.';
      return next(error);
    });
};

exports.getTweets = (req, res, next) => {
  TwitterSettings.find()
    .then(settings => {
      const tweet_count = settings[0].tweet_count;
      Tweet.find()
        .then(tweets => {
          if (tweets.length > 0) {
            res.status(200).json(tweets.slice(0, tweet_count));
          } else {
            let params = {
              screen_name: twitter_config.screen_name,
              count: tweet_count
            };
            return twitter_client.get('statuses/user_timeline', params)
              .then(tweets => {
                let myTweets = [];
                for (i = 0; i < tweet_count; i++) {
                  let name = tweets.data[i].user.name;
                  let username = tweets.data[i].user.screen_name;
                  let profile_pic_url = tweets.data[i].user.profile_image_url_https;
                  let content = tweets.data[i].text;
                  let media = [];
                  let date = new Date(Date.parse(tweets.data[i].created_at)).getTime();
                  let profile_url = 'https://twitter.com/' + tweets.data[i].user.screen_name;
                  let tweet_url = 'https://twitter.com/' + tweets.data[i].user.screen_name + '/status/' + tweets.data[i].id_str;
                  let retweeted = tweets.data[i].retweeted_status ? true : false;
                  // parsing retweets
                  if (retweeted) {
                    name = tweets.data[i].retweeted_status.user.name;
                    username = tweets.data[i].retweeted_status.user.screen_name;
                    profile_pic_url = tweets.data[i].retweeted_status.user.profile_image_url_https;
                    content = tweets.data[i].retweeted_status.text;
                    date = new Date(Date.parse(tweets.data[i].retweeted_status.created_at)).getTime();
                    profile_url = 'https://twitter.com/' + tweets.data[i].retweeted_status.user.screen_name;
                    tweet_url = 'https://twitter.com/' + tweets.data[i].retweeted_status.user.screen_name + '/status/' + tweets.data[i].retweeted_status.id_str;
                  }
                  // parsing urls
                  if (tweets.data[i].entities.urls[0]) {
                    content = content.replace(tweets.data[i].entities.urls[0].url, tweets.data[i].entities.urls[0].expanded_url);
                  }
                  // parsing media
                  if (tweets.data[i].entities.media) {
                    for (j = 0; j < tweets.data[i].entities.media.length; j++) {
                      media.push(tweets.data[i].entities.media[j].media_url_https);
                      content = content.replace(tweets.data[i].entities.media[j].url, '');
                    }
                  }
                  myTweets.push(new Tweet({
                    name: name,
                    username: username,
                    profile_pic_url: profile_pic_url,
                    content: content,
                    media: media,
                    date: date,
                    profile_url: profile_url,
                    tweet_url: tweet_url,
                    retweeted: retweeted
                  }));
                }
                myTweets.forEach(tweet => {
                  tweet.save();
                });
                res.status(200).json(myTweets);
              })
              .catch(err => {
                const error =  new Error(err);
                error.status = 401;
                error.msg = 'Unknown error occured.';
                return next(error);
              });
          }
        })
        .catch(err => {
          const error =  new Error(err);
          error.status = 401;
          error.msg = 'Unknown error occured.';
          return next(error);
        });
    })
    .catch(err => {
      const error =  new Error(err);
      error.status = 401;
      error.msg = 'Unknown error occured.';
      return next(error);
    });
};
