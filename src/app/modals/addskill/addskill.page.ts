import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.page.html',
  styleUrls: ['./addskill.page.scss'],
})
export class AddskillPage implements OnInit {
  
  
  constructor(public modalCtrl: ModalController) { }

  months: any = [
    {id: 'jan', display: 'January'},
    {id: 'feb', display: 'February'},
    {id: 'mar', display: 'March'},
    {id: 'apr', display: 'April'},
    {id: 'may', display: 'May'},
    {id: 'jun', display: 'June'},
    {id: 'jul', display: 'July'},
    {id: 'aug', display: 'August'},
    {id: 'sep', display: 'September'},
    {id: 'oct', display: 'October'},
    {id: 'nov', display: 'November'},
    {id: 'dec', display: 'December'}, 
  ];

  years = new Array();

  ngOnInit() {
    const currentYear: number = new Date().getFullYear();
    for(let i = 0; i < 80; i++) {
      this.years.push( {id: currentYear - i, display: currentYear - i} );
    }
  } 

  

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}