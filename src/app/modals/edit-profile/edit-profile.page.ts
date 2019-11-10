import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DBService } from 'src/app/services/db.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  private user: any;
  private editProfileForm;

  private formGroup: FormGroup;
  // private formControl: FormControl;
  private submitAttempt: boolean = false;



  constructor(private modalCtrl: ModalController, private storage: Storage, 
              private dbService: DBService, private authService: AuthService,
              private formBuilder: FormBuilder) { 
    this.user = authService.getLoginUser();

    const urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.formGroup = formBuilder.group({
      name: [this.user.name , Validators.compose([Validators.maxLength(50), Validators.pattern('.*'), Validators.required])],
      tagline: [this.user.tagline, Validators.compose([Validators.maxLength(160), Validators.pattern('.*')])],
      website: [this.user.website, Validators.compose([Validators.maxLength(100), Validators.pattern(urlRegex)])],
      location: [this.user.location, Validators.compose([Validators.maxLength(30), Validators.pattern('.*')])]

  });
    
  }

  ngOnInit() {

  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  saveAndDismisModal() {
    this.submitAttempt = true;
    console.log('is form valid ' + !this.formGroup.valid);
    if(this.formGroup.valid){
      
      // Save the user object
      console.log( this.formGroup.controls.name.value );
      this.user.name = this.formGroup.controls.name.value;
      this.user.tagline = this.formGroup.controls.tagline.value;
      this.user.website = this.formGroup.controls.website.value;
      this.user.location = this.formGroup.controls.location.value;

      console.log( this.user );
      this.authService.setLoggedInUser(this.user);
      this.dbService.updateProfile( this.user ).then( result => {
        this.modalCtrl.dismiss({
          'dismissed': true
        });
      });

    } else {
      
    }
    
    
    

  }

}
