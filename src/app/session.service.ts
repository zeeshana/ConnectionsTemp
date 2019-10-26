import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http: HttpClient) { }
  getRedirectUrl() {
  return this.http.get('http://localhost:8080/sessions/connect')
}
  saveAccessToken(oauthToken: string, oauthVerifier: string) {
    return this.http.get(`http://localhost:8080/sessions/saveAccessTokens?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`)
  }
}