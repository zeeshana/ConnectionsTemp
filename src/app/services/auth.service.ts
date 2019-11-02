import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';
import { DBService } from './db.service';


export interface AuthStatus {
  name:string;
  roles : string[];
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  authStatus: BehaviorSubject<AuthStatus> = new BehaviorSubject(null);

  constructor(private dbService: DBService) {
    
    // const currentUser = this.getLoginUser();
    // console.log('######### BEFORE setAuthStatus ########');
    // console.log(currentUser);
    // console.log((currentUser && currentUser.person));
    // if(currentUser && currentUser.person){
    //   this.setAuthStatus(currentUser.person.uid,['User']);
    // }
    this.setAuthStatus();
  }

  async logIn(username:String, token:String) {
    
    return this.dbService.logIn(username,token).then(async user => {
        console.log('User login successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
        
        const person = await this.dbService.getPerson('uid', user.get("userId"));
        var tryConnectinosAuth = {"user" : {"username" : user.get("username"), "token" : user.get("oauth_verifier") }, "person" : person};
        //tryConnectinosAuth.person = person;
        await this.setLoginUser(tryConnectinosAuth);
        //this.setAuthStatus(user.get("userId"),['User']);
        await this.setAuthStatus();

        return true;
      }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);
        return false;
      });


  }

  async setLoginUser(tryConnectinosAuth)
  {
    localStorage.setItem('tryConnectinosAuth', JSON.stringify(tryConnectinosAuth));
  }

  getLoginUser()
  {
    console.log("######### Get Login User #########");
    const authUser = JSON.parse(localStorage.getItem("tryConnectinosAuth"));
    console.log(authUser);
    if(authUser != null && authUser.user && authUser.person)
    {
      //get current user from localstorage
      return authUser.person;
    }
    else
    {

      return null;
    }
  }

  async setAuthStatus()
  {
    const person = this.getLoginUser();
    if(person && person){
      console.log("inside setAuthStatus");
      console.log("id : " + person.uid);
      this.authStatus.next({name:person.uid, roles:['User']});
    }
    else{
      this.authStatus.next(null);
    }

  }

  getAuthStatus()
  {
    return this.authStatus.asObservable();
  }

  logout()
  {
    console.log('logout');
    this.authStatus.next(null);
    localStorage.setItem('tryConnectinosAuth', null);
  }
}
