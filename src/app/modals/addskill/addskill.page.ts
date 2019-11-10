import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DBService } from 'src/app/services/db.service';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.page.html',
  styleUrls: ['./addskill.page.scss'],
})
export class AddskillPage implements OnInit {
  private user: any;
  private skill: any = {
    name: '',
    startDuration: new Date(),
    endDuration: new Date()
  };

  private formGroup: FormGroup;
  private submitAttempt: boolean = false;
  private datesError: boolean = false;
  
  constructor(private modalCtrl: ModalController, private storage: Storage, 
    private dbService: DBService, private authService: AuthService,
    private formBuilder: FormBuilder) { 

      this.user = authService.getLoginUser();
      
      this.formGroup = formBuilder.group({
        name: ['' , Validators.compose([Validators.maxLength(50), Validators.pattern('.*'), Validators.required])],
        startDuration: [ ],
        endDuration: []
      });

    }

  startDates = new Array();
  month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  endDates = new Array();
    
  

  ngOnInit() {
    for(let i = 1; i < 240; i++) {

      let d = new Date();
      d.setMonth( d.getMonth() - i);
      const datestring = this.month_names_short[ d.getMonth() ] + ", " + d.getFullYear();
      const dateValue = d.getFullYear() + '-' + ('0' + (d.getMonth()+1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
      let dateObj = { 'dateValue': dateValue, 'dateString': datestring};
      this.startDates.push(dateObj);
    }
    
    for(let i = 0; i < 239; i++) {

      let d = new Date();
      d.setMonth( d.getMonth() - i);
      let datestring = this.month_names_short[ d.getMonth() ] + ", " + d.getFullYear();
      if(i == 0) {
        datestring = "Currently using this skill";
      }
      const dateValue = d.getFullYear() + '-' + ('0' + (d.getMonth()+1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
      let dateObj = { 'dateValue': dateValue, 'dateString': datestring};
      this.endDates.push(dateObj);
    }
  } 

  

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  saveSkillAndDismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.submitAttempt = true;
    let startDateString = this.formGroup.controls.startDuration.value;
    let endDateString = this.formGroup.controls.endDuration.value;
    if(startDateString == null) {
      startDateString = this.startDates[0].dateValue;
    }
    if(endDateString == null) {
      endDateString = this.endDates[0].dateValue;
    }

    let startDate: Date = new Date( startDateString );
    let endDate: Date = new Date( endDateString );
    
    console.log( startDate < endDate );
    if( startDate >= endDate ) {
      this.datesError = true;
      return;
    } else {
      this.datesError = false;
    }

    if(this.formGroup.valid){
 
      this.skill.name = this.formGroup.controls.name.value;
      this.skill.startDuration = startDateString;
      this.skill.endDuration = endDateString;
      this.skill.duration = Math.floor( (endDate -  startDate) / 2629746000 ); 
      
      // console.log( this.skill.endDuration -  this.skill.startDuration );
      // this.user.skills = new Array();
      if(this.user.skills ==  null || this.user.skills.length == 0) {
        this.user.skills = new Array(); 
      }
      this.user.skills.push( this.skill );

      this.authService.setLoggedInUser(this.user);
     

      this.dbService.updateProfile(this.user).then(result => {
        this.modalCtrl.dismiss({
          'dismissed': true
        });
      });

      
    } else {
      
    }
  }
}