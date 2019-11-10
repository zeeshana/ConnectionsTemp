import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DBService } from './db.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
@Pipe({  
  name: 'reverse',
  pure:false
 })
 
export class MessageService implements PipeTransform {
  transform (values: any) {
    if (values) {
     return values.slice().reverse();
      }
     }

private Parse:any;
private Messages:any;
private MessageRef:any;
currentPerson:any = null;
chats:Array<any> = [];
chatsIdsArray:Array<any> = [];
chatMessages:Array<any> = [];
currentChatWindow:any = null;
currentChatMessagePage = 1;
currentChatMessagePageSize = 10;


  constructor(private dbService: DBService,private toastController: ToastController, private authService: AuthService,private router: Router) {
    console.log("############################# MessageService : Consturctor #################################");
    console.log("!!!!!!!!!!!!!         1          !!!!!!!!!!!!!!")
    this.Parse = this.dbService.getParseObject();
    this.Messages = this.Parse.Object.extend("Messages");
    this.MessageRef = this.Parse.Object.extend("MessageRef");
    this.chats = [];
    this.currentChatWindow = null;
    this.currentPerson = this.authService.getLoginUser();
    //this.initChats();
   // this.init();
    
  }
  
  //not in use
  // async init()
  // {
  //   await this.initChats();
  //   await this.initMessageSubscriptionGlobal();
  // }

  async initChats()
  {
    console.log("!!!!!!!!!!!!!         3          !!!!!!!!!!!!!!")
    //console.log("MessageService: initChats");
    console.log(this.chats);
    var personPointer = {
      __type: 'Pointer',
      className: 'Person',
      objectId: this.currentPerson.objectId
    }

   var fromQuery = new this.Parse.Query(this.MessageRef); 
   fromQuery.include("userFrom");
   fromQuery.include("userTo"); 
   fromQuery.equalTo('userFrom', personPointer);
   var toQuery = new this.Parse.Query(this.MessageRef);
   toQuery.include("userFrom");
   toQuery.include("userTo"); 
   toQuery.equalTo('userTo', personPointer);
   
    var mainQuery = this.Parse.Query.or(fromQuery, toQuery);
    mainQuery.include("userFrom"); 
    mainQuery.include("userTo"); 
    var res = await mainQuery.find();
    this.chats = [];
    this.chatsIdsArray = [];

    for (let i = 0; i < res.length; i++) {
      var object = this.formtatChatListItem(res[i]);
      this.chats.push(object); 
      this.chatsIdsArray.push(object.messageRefId);
    }
      console.log("############## chats[0]");
      console.log(this.chats.length);
      console.log(this.chats[0]);
      this.currentChatWindow = this.chats.length > 0 ? this.chats[0] : null; //default top one
      
  }
  
  async initMessageSubscription()
  {
    var msgQuery = new this.Parse.Query(this.Messages); 
    msgQuery.include("createdAt");
    msgQuery.include("messageContent");
    msgQuery.include("messageRefId");
    msgQuery.include("objectId");
    msgQuery.include("updatedAt");
    msgQuery.include("userFrom");
    msgQuery.containedIn("messageRefId",this.chatsIdsArray);
    const subscription = await msgQuery.subscribe();
    return subscription
    /*
    subscription.on('create', (message)  => {
      if(this.currentChatWindow.messageRefId == message.get('messageRefId').id)
      {
        console.log(message);
        this.pushChatMessages(message);
        this.presentToast('You have new message from ' + message.get('userFrom').get('name')); 
      }
      else
      {
        this.presentToast('You have new message from ' + message.get('userFrom').get('name'));
      }
    });
    */
  }
 
  async initMessageSubscriptionGlobal()
  {
    console.log("!!!!!!!!!!!!!         5          !!!!!!!!!!!!!!")
    //console.log("MessageService : initMessageSubscriptionGlobal");

    var personPointer = {
      __type: 'Pointer',
      className: 'Person',
      objectId: this.currentPerson.objectId
    }

   var fromQuery = new this.Parse.Query(this.MessageRef); 
   fromQuery.include("userFrom");
   fromQuery.include("userTo"); 
   fromQuery.equalTo('userFrom', personPointer);
   var toQuery = new this.Parse.Query(this.MessageRef);
   toQuery.include("userFrom");
   toQuery.include("userTo"); 
   toQuery.equalTo('userTo', personPointer);
   
    var mainQuery = this.Parse.Query.or(fromQuery, toQuery);
    mainQuery.include("userFrom"); 
    mainQuery.include("userTo"); 
    var res = await mainQuery.find();

    for (let i = 0; i < res.length; i++) {
      var object = this.formtatChatListItem(res[i]);
      this.chatsIdsArray.push(object.messageRefId);
    }

    var msgQuery = new this.Parse.Query(this.Messages); 
    msgQuery.include("createdAt");
    msgQuery.include("messageContent");
    msgQuery.include("messageRefId");
    msgQuery.include("objectId");
    msgQuery.include("updatedAt");
    msgQuery.include("userFrom");
    msgQuery.containedIn("messageRefId",this.chatsIdsArray);
    const subscription = await msgQuery.subscribe();
  
    subscription.on('create', (message)  => {
      console.log("New meessage arrived, Current Page >>");
      console.log(this.router.url);
      console.log((this.router.url.indexOf('message') == -1));
      if(this.router.url.indexOf('message') == -1 && this.currentPerson.objectId != message.get('userFrom').id)
        {
          this.presentToast('You have new message from ' + message.get('userFrom').get('name'));
        }
    });
    
  }

  async fetchChatMessages(loadMore)
  {
    console.log("MessageService: fetchChatMessages START");

    var messageRefPointer = {
      __type: 'Pointer',
      className: 'MessageRef',
      objectId: this.currentChatWindow.messageRefId
    }
    var  msgQuery = new this.Parse.Query(this.Messages); 
    msgQuery.include("createdAt");
    msgQuery.include("messageContent");
    msgQuery.include("messageRefId");
    msgQuery.include("objectId");
    msgQuery.include("updatedAt");
    msgQuery.include("userFrom");
    msgQuery.equalTo("messageRefId", messageRefPointer);


    
    const page = (this.currentChatMessagePage * this.currentChatMessagePageSize) - this.currentChatMessagePageSize;
    const pageSize = this.currentChatMessagePageSize;
    msgQuery.limit(pageSize);
    msgQuery.skip(page);
	  msgQuery.descending("updatedAt");
    this.currentChatMessagePage++;

    var res  = await msgQuery.find();

    if(!loadMore)
      this.chatMessages =[];

    for (let i = 0; i < res.length; i++) {
      this. pushChatMessages(res[i],false)
    }

  }

  pushChatMessages(msg,newMsg)
  {
    console.log("pushChatMessages");
    var msgItem = this.formatChatMessage(msg);
    //console.log(msgItem);
    if(newMsg)
      this.chatMessages.push(msgItem);
    else
      this.chatMessages.unshift(msgItem);
    // this.chatMessages.push(msgItem);
    //this.messages.push(Object.assign({}, message));
    //this._cdr.detectChanges();
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      header: 'New Message',
      message: msg,
      position: "top",
      duration: 2000
    });
    toast.present();
  }

  formatChatMessage(msg)
  {
    return {"userFrom":msg.get('userFrom').get('name'), "userFromId":msg.get('userFrom').id, "userFromHandle":msg.get('userFrom').get('username'), "messageContent": msg.get('messageContent'), "time": msg.get('updatedAt')}
  }
  
  formtatChatListItem(chat)
  {
    const chatPersonTo = (chat.get('userFrom').id == this.currentPerson.objectId) ? chat.get('userTo') : chat.get('userFrom');
    return {"personName": chatPersonTo.get('name'), "personId":  chatPersonTo.id, "personPhoto": chatPersonTo.get("photo"), "personHandle": chatPersonTo.get('handle'), "messageRefId" : chat.id};
  }

  async sendMessage(newMessage)
  {
     var personPointer = {
       __type: 'Pointer',
       className: 'Person',
       objectId: this.currentPerson.objectId
     }
    var messageRefPointer = {
       __type: 'Pointer',
       className: 'MessageRef',
       objectId: this.currentChatWindow.messageRefId
     }
    const message = new this.Messages();
    message.set("messageRefId",messageRefPointer);
    message.set("userFrom",personPointer); //TODO: this field will be override in global cloud code
    message.set("messageContent",newMessage);
    return message.save()
  }

  async createNewChat(username)
  {
     await this.dbService.getPerson("handle", username).then(async res=>
      {
        console.log("Get Proson Result");
        console.log(res);
        
        if(res == null || res == undefined || res.length <= 0)
          return false;

        var fromPersonPointer = {
          __type: 'Pointer',
          className: 'Person',
          objectId: this.currentPerson.objectId
        }

        var toPersonPointer = {
          __type: 'Pointer',
          className: 'Person',
          objectId: res.id
        }

        console.log("newChat");
        const newChat = new this.MessageRef;
        console.log(this.MessageRef);
        console.log(newChat);
        newChat.set("userFrom",fromPersonPointer);
        newChat.set("userTo",toPersonPointer);
        
        const savedChat = await newChat.save();
        /*
        var object = this.formtatChatListItem(savedChat);
        this.chats.push(object); 
        this.chatsIdsArray.push(object.messageRefId);
        */
      }
    );

  }
  
}
