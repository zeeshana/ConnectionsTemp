import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DBService } from '../services/db.service'; 
import { SessionService } from '../session.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private person: any;
  constructor(private authService: AuthService,
    private sessionService: SessionService, 
    private activatedRoute: ActivatedRoute,public navCtrl: NavController, private storage: Storage,
    private dbService: DBService) {
      
      this.activatedRoute.queryParams.subscribe(params => {
        const oauthVerifier = params['oauth_verifier'];
        const oauthToken = params['oauth_token'];

        console.log(params);
        console.log(oauthVerifier);
        console.log(oauthToken);

        if (oauthToken && oauthVerifier) {
          this.saveAccessToken(oauthToken, oauthVerifier);
        }
      });


     }

   ngOnInit() {}
  saveAccessToken(oauthToken: string, oauthVerifier: string) {
    this.sessionService.saveAccessToken(oauthToken, oauthVerifier).subscribe(res => {
    //alert('Token saved');
      console.log(res);
      const reuslt = JSON.stringify(res)   ;
      const reusltJson = JSON.parse(reuslt)   ;
      //TODO: check status code here
      if(reusltJson.token)
      {
          this.logIn(reusltJson.username,reusltJson.token);
      }



    })
  }

 
  async logIn(username:String, token:String) {

  if(await this.authService.logIn(username,token))
  {
    this.navCtrl.navigateForward('/profile');
  }
  else
  {
    console.log('Authentication Error');
  }

}
  logInWithTwitter() {
    this.sessionService.getRedirectUrl().subscribe((res: any) => {
      location.href = res.redirectUrl;
    })
  }

}
