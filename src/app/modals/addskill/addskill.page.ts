import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.page.html',
  styleUrls: ['./addskill.page.scss'],
})
export class AddskillPage implements OnInit {
  
  
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
   
  } 

  

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}