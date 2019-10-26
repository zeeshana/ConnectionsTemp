import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {  DBService } from '../services/db.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(private authService: AuthService, private navCtrl: NavController, private storage: Storage,
    private dbService: DBService) { }

  ngOnInit() {
  }

  


}
