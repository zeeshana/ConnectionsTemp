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
  @ViewChild('barChart', {static: true}) barChart;
  user: any;
  bars: any;
  colorArray: any;
  labels = [];
   
 
  constructor(private authService: AuthService, private dbService: DBService, private modalController: ModalController,
    private storage: Storage) {
       
      this.user = this.authService.getLoginUser();
      //this.user.className = 'Person';
    

      /*
    this.dbService.getPerson('handle', 'zaheerbaloch').then( result => {
      this.user = result;
      this.user.set("className", "Person");
      // this.user.className = result[0].className;
      // this.user.objectId = result[0].objectId;

      console.log( this.user );

      
      storage.set("user", JSON.stringify( this.user ) ).then( result => {
        console.log("inside set result");
        console.log(result);
        storage.get("user").then( result => {
          console.log( "inside get user");
          console.log(result);
          this.user = JSON.parse( result );
          console.log(this.user);
          this.createBarChart();
        });
      });
      
      // this.createBarChart();
      // this.user = storage.get("user").then( result => {
      //  console.log(this.user);
      // });
      

      // TODO: this needs to change to authserivce to get loggedin user.
      //  TODO: storage.set("user", this.user.toString());
      // storage.get("user").then( result => {
      //   this.user = result;
      //   console.log( this.user );
        
      // }); 
      
      
    });
*/
    
  }

  ngOnInit() {

    

  }

  async presenteditProfileModal() {
    const modal = await this.modalController.create({
      component: EditProfilePage
    });
    modal.onDidDismiss().then( result => {
      this.storage.get("user").then( result => {
        console.log( "inside get user");
        console.log(result);
        this.user = JSON.parse( result );
        console.log(this.user);
        // this.createBarChart();
      });
    });
    return await modal.present();
  }


  async presentAddSkillModal() {
    const modal = await this.modalController.create({
      component: AddskillPage
    });
    return await modal.present();
  }


  getLabelFunction = function getLabel(value) {
    console.log(this.labels);
  }



  createBarChart() {
    
    let datasets = [];
    // transform skills to dataset
    let skills = this.user.skills;
    
    
    for(let i=0; i<skills.length; i++) {
      
      let durations = skills[i].durations;
     
      this.labels.push( skills[i].name );
      
      for(let j=0; j<durations.length; j++) {

        console.log( durations[j].startDate.iso );
        
        let dataset = {
          label: skills[i].name,
          backgroundColor: "#ff4742",
          borderColor: "#ff4742",
          fill: false,
          borderWidth : 20,
          pointRadius : 0,
          data: [
              {
               
                x: new Date( durations[j].startDate.iso ),
                y: i+1
              }, {
                x: new Date( durations[j].endDate.iso ),
                y: i+1
              },
          ]
        };

        datasets.push( dataset );

       

      }
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
                  fontSize: 18,
                      fontFamily: 'apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                      fontColor: '#000000',
                      steps: 0.5,
                },
                // gridLines: { color: "rgba(0, 0, 0, 0)", }
              }],
              yAxes : [{
                  scaleLabel : {
                      // display: false
                  },
                  ticks : {
                      beginAtZero: true, 
                      fontSize: 18,
                      fontFamily: 'apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                      fontColor: '#000000',
                      callback: function(value) {
                        //return this.labels[value-1];
                        if(value == 1) {
                          return "Java";
                        } 
                        if (value == 2) {
                          return "Angular";
                        }
                        //return value;
                        return "";
                      },
                      stepSize: 1,
                      max: 3
                  },
                  // gridLines: { color: "rgba(0, 0, 0, 0)", }
              }]
          }
      }
  });
}





}
