import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http: HttpClient) { }
  getRedirectUrl() {
  return this.http.get('https://thirsty-rosalind-876957.netlify.com/.netlify/functions/server/connect')
}
  saveAccessToken(oauthToken: string, oauthVerifier: string) {
    return this.http.get(`https://thirsty-rosalind-876957.netlify.com/.netlify/functions/server/saveAccessTokens?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`)
  }
}