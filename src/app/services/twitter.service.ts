import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import oauthSignature from 'oauth-signature';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  private apiKey = 'PXqgMKI0D6IBa6lBAAAbHGJ08';
  private apiSecretKey = 'tshLPTtv1IEC43CnoLToGalgm8Mr3YgR0mDYt6kHeuDE9q8n9m';
  private accessToken = '1798187892331937792-RP6PSNKWHRGFMso0aPwcwlBpKoz5xB';
  private accessTokenSecret = '7crSc3E4jUkoJmVeDFLVp46qXr6wRhQxshUIFrqquAbTk';

  constructor(private http: HttpClient) {}

  private generateOauthSignature(method: string, url: string, params: any) {
    return oauthSignature.generate(method, url, params, this.apiSecretKey, this.accessTokenSecret);
  }

  private getAuthHeaders(method: string, url: string, params: any) {
    params.oauth_signature = this.generateOauthSignature(method, url, params);
    const headerParams = Object.keys(params)
      .map(key => `${key}="${encodeURIComponent(params[key])}"`)
      .join(', ');
    return `OAuth ${headerParams}`;
  }

  public sendTweet(status: string) {
    const url = 'https://api.twitter.com/2/tweets';
    const method = 'POST';
    const params = {
      oauth_consumer_key: this.apiKey,
      oauth_token: this.accessToken,
      oauth_token_secret:this.accessTokenSecret,
      oauth_consumer_secret:this.apiSecretKey,
      //oauth_nonce: Math.random().toString(36).substring(7),
      //oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version: '1.0',
      status
    };
    const headers = new HttpHeaders({
      Authorization: this.getAuthHeaders(method, url, params),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post(url, null, { headers, params });
  }

  public getUserInfo() {
    const url = 'https://api.twitter.com/2/users/me';
    const method = 'GET';
    const params = {
      oauth_consumer_key: this.apiKey,
      oauth_token: this.accessToken,
      oauth_token_secret:this.accessTokenSecret,
      oauth_consumer_secret:this.apiSecretKey,
      //oauth_nonce: Math.random().toString(36).substring(7),
      //oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version: '1.0'
    };
    const headers = new HttpHeaders({
      Authorization: this.getAuthHeaders(method, url, params)
    });
    return this.http.get(url, { headers });
  }
}