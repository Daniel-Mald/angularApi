// src/app/components/send-tweet/send-tweet.component.ts
import { Component } from '@angular/core';
import { TwitterService } from '../../services/twitter.service';

@Component({
  selector: 'app-send-tweet',
  templateUrl: './send-tweet.component.html',
  styleUrls: ['./send-tweet.component.css']
})
export class SendTweetComponent {
  tweetText: string = '';

  constructor(private twitterService: TwitterService) {}

  sendTweet() {
    this.twitterService.sendTweet(this.tweetText).subscribe(response => {
      console.log('Tweet enviado:', response);
      this.tweetText = '';
    }, error => {
      console.error('Error al enviar tweet:', error);
    });
  }
}
