import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef} from '@angular/core';
import { MessageService } from '../services/message.service';
import { IonContent } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ 
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})


export class MessagePage implements OnInit {
  //chats:Array<any> = [];
  
  //messages: Array<any> = [];
  newMessage= "";
  queryParamUsername = "";
  subscription:any = null;
  currentChatpersonName = "";
  currentChatWindow : Array<any> = [];
  @ViewChild('messagewindow',null) private myScrollContainer: ElementRef;
  //currentPerson:any;
  //contactList: Array<any> = [];
  //selectedContact:any;
  //subscription = null;
  //msgRefIdArray: Array<any> = [];
  

  constructor( private route: ActivatedRoute,private router: Router, public ms: MessageService,private _cdr: ChangeDetectorRef,) {  console.log("MessagePage : @@@@@@@@@@@@@@@ constructor");}
  ngOnInit() {
    console.log("MessagePage : @@@@@@@@@@@@@@@ ngOnInit");
    
   //this.sessionId = this.route.queryParamMap.pipe(Map(params => params.get('handle') || 'None'));

  }
  ngOnDestroy() {
    console.log("MessagePage : @@@@@@@@@@@@@@@ ngOnDestroy");
    this.subscription.unsubscribe();
  }

  ionViewDidEnter() {
    console.log('---------------- ionViewDidEnter --------------');
    this.newMessage= "";
    this.initMessagePage();
  
  }

  async initMessagePage()
  {
    this.ms.currentChatMessagePage = 1;
    if(this.ms.chats.length <=0)
    {
      console.log("Loading chats....");
      await this.ms.initChats();
      this.currentChatWindow = this.ms.chats;
    }
    
    console.log("1 - @@@@@@@@@@@@@@@@@@@@ ckecking isChatNotExist");
    const isChatExist = await this.isChatExist();
    console.log("isChatExist : " + isChatExist );
    console.log(isChatExist );
    if(!isChatExist)
    {
      console.log("3 - @@@@@@@@@@@@@@@@@@@@ Inside IF");
      console.log('Creating New Chat');
      await this.ms.createNewChat(this.queryParamUsername);
      await this.ms.initChats();
      console.log('Chate created');
    }
    

    console.log("After  : " + this.ms.chats.length);
   

    this.currentChatpersonName = this.ms.currentChatWindow.personName;
    await this.ms.fetchChatMessages(false);
    this.scrollToBottom();
    if(this.subscription == null)
    {
      console.log("Subscribing Message Web Socket");
      this.subscription = await this.ms.initMessageSubscription();
      this.initSubscription();
    }
    else
    {
      console.log("######### Web Socket Already Subscribe #########"); 
    }
  }

  async isChatExist()
  {
    console.log("2 --- £££££££££££££££££££££ getQueryParam");
    let res:boolean = false;
    this.route.paramMap.subscribe(params => {
      console.log("handle : " + params.get('handle'));
      this.queryParamUsername = params.get('handle') || null;
      console.log("this.queryParamUsername : " + this.queryParamUsername);
        if (this.queryParamUsername != null) {
          console.log("--------- not null query param");
          return this.ms.chats.forEach((value, key) => {
            console.log("value.personHandle");
            console.log(value.personHandle);
            if(!res)
             {
               if(this.queryParamUsername === value.personHandle)
                {
                  res = true;
                  this.ms.currentChatWindow = value;
                }
             }
          });
        }
        else {
          console.log("--------------- Queyr param is null ");
          res=  false;
        }
    });

    console.log("Returning res : " + res);
    this.clearPosParam() ;
    return res;
  }

  clearPosParam() {
    //TODO:clear param from URL
  }

  initSubscription()
  {
    console.log("initSubscription");
    this.subscription.on('create', (message)  => {
      if(this.ms.currentChatWindow.messageRefId == message.get('messageRefId').id)
      {
        console.log(message);
        this.ms.pushChatMessages(message,true);
        this._cdr.detectChanges();
        this.scrollToBottom();
      }
      else
      {
        this.ms.presentToast('You have new message from ' + message.get('userFrom').get('name'));
        //TODO: Here we have to show count and red dot for new messages in chat list
      }
    });

  }

  scrollToBottom()
  {
    console.log('Scroll to bottom');
    setTimeout(()=>{
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    })
  }

  sendMessage()
  {
   // var msgRefId = this.selectedContact.messageRefId;
    this.ms.sendMessage(this.newMessage).then((res) => {
      console.log('New object created with objectId: ' + res.id);
      //this._cdr.detectChanges();
      this.newMessage= "";
      this.scrollToBottom();
    }, (error) => {
      // Save fails
      console.log('Failed to create new object, with error code: ' + error.message);
    });

  }

  async selectContact(contactIndex)
  {
    this.ms.currentChatMessagePage = 1;
    this.ms.currentChatWindow = this.ms.chats[contactIndex];
    this.currentChatpersonName = this.ms.currentChatWindow.personName;
    await this.ms.fetchChatMessages(false);
    this.scrollToBottom();
  }

  loadMoreMessages()
  {
    this.ms.fetchChatMessages(true);
  }
}
