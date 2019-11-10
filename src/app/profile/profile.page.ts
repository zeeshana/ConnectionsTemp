import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DBService } from '../services/db.service';
import { AddskillPage } from '../modals/addskill/addskill.page';
import * as firebase from 'firebase/app';

import { Storage } from '@ionic/storage';

import { Chart } from 'chart.js';
import { EditProfilePage } from '../modals/edit-profile/edit-profile.page';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  @ViewChild('barChart', {static: true}) barChart;

  user: any;
  bars: any;
  colorArray: any;
  labels = [];
  colors = [ "#63b3ed", "#48bb78", "#ed8936", "#667eea", "#f56565", "#38b2ac", "#ecc94b", "#9f7aea", "#ed64a6"  ];
  largestMonths = 0;
  firstMonth = new Date();
  lastMonth = new Date();
  offsetPercentages = new Array();
  
   
 
  constructor(private authService: AuthService, private dbService: DBService, private modalController: ModalController,
    private storage: Storage) {
      this.user = this.authService.getLoginUser();

   }

  
   ionViewDidEnter() {

    this.createBarChart();

   }


  async presenteditProfileModal() {
    const modal = await this.modalController.create({
      component: EditProfilePage
    });
    modal.onDidDismiss().then( result => {
      this.user = this.authService.getLoginUser();
    });
    return await modal.present();
  }


  async presentAddSkillModal() {
    const modal = await this.modalController.create({
      component: AddskillPage
    });
    modal.onDidDismiss().then( result => {
      this.user = this.authService.getLoginUser();
      this.createBarChart();

    });
    return await modal.present();
  }

  deleteSkill(index) {
    const skills = this.user.skills;
    
    this.user.skills.splice(index, 1);
    this.authService.setLoggedInUser(this.user);
    this.dbService.updateProfile(this.user).then(result => {
      this.user = this.authService.getLoginUser();
      // this.createBarChart();
    });

  }


    createBarChart() { 
    
    console.log("inside createBarChart()");
    let datasets = [];
    // transform skills to dataset
    let skills = this.user.skills;
    
    console.log( skills );
    
    for(let i=0; i<skills.length; i++) {
      
      this.labels.push( skills[i].name );
        
      let dataset = {
        label: skills[i].name,
        backgroundColor: '#a0aec0',
        borderColor: '#a0aec0',
        fill: false,
        borderWidth : 20,
        pointRadius : 0,
        data: [
            {
              x: new Date( skills[i].startDuration ),
              y: i+1
            }, {
              x: new Date( skills[i].endDuration ),
              y: i+1
            },
        ]
      };

      datasets.push( dataset );


    }

    this.bars = new Chart(this.barChart.nativeElement, {
      
      type: 'line',
      data: {
         
          datasets: datasets

      },
      options: {
          legend: {
            display: false
          },
          animation: false,
          scales: {
              xAxes: [{
                  type: 'time',
                  // position: 'bottom',
                  time: {
                    unit: 'year',
                    displayFormats: {
                      quarter: 'YYYY'
                    },
                    distribution: 'series',
                },
                ticks: {
                  fontSize: 16,
                      fontFamily: 'apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                      fontColor: '#000000',
                      stepSize: 1
                },
                // gridLines: { color: "rgba(0, 0, 0, 0)", }
              }],
              yAxes : [{
                  scaleLabel : {
                      // display: false
                  },
                  ticks : {
                      beginAtZero: true, 
                      fontSize: 16,
                      fontFamily: 'apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                      fontColor: '#000000',
                      customLabels: this.labels,
                      // labelString: "Y Axis"
                      callback: function(value) {
                        //return this.labels[value-1];
                        if( value > 0 && value <= this.options.ticks.customLabels.length) {
                          return this.options.ticks.customLabels[value-1];
                        } else {
                          return "";
                        }
                        
                      },
                      stepSize: 0
                  },
                  // gridLines: { color: "rgba(0, 0, 0, 0)", }
              }]
          },
          tooltips: {

          }
      }
  });
}




}
