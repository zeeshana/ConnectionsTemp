import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DBService } from 'src/app/services/db.service';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  private user: any;
  private editProfileForm;

  constructor(private modalCtrl: ModalController, private storage: Storage, 
              private dbService: DBService) { 
    storage.get("user").then( result => {
      this.user = JSON.parse( result );
      console.log(this.user);

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
    // Save the user object
    console.log("inside save and dismiss modal");
    console.log(this.user);
    this.storage.set("user", JSON.stringify(this.user) ).then( result => {
      // Save  this in DB now...
      this.storage.get("user").then( result => {
        this.user = JSON.parse( result );
        this.dbService.updateProfile( this.user );
        console.log(this.user);
        this.modalCtrl.dismiss({
          'dismissed': true
        });


      });
      
    });
    

    
  }

}
