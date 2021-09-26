import { Component, OnInit } from '@angular/core';

import { TwitterService } from './twitter.service';
import { Tweet } from './tweet.model';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss']
})

export class TwitterComponent implements OnInit {

  tweets!: Tweet[];

  constructor(private twitterService: TwitterService) { }

  ngOnInit() {
    this.twitterService.findAll()
      .subscribe(tweets => {
        const temp = tweets.sort((x, y) => y.date - x.date);
        let timeOptions = {
          hour: '2-digit',
          minute: '2-digit'
        } as const;
        let dateOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        } as const;
        temp.forEach(tweet => {
          tweet.dateString = new Date(tweet.date).toLocaleDateString('en-US', dateOptions);
          tweet.time = new Date(tweet.date).toLocaleTimeString('en-US', timeOptions);
        });
        this.tweets = temp;
      }
    );
  }
}
