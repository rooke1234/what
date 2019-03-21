import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { P3Page } from '../p3/p3';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service';
import { EditdrugPage } from '../editdrug/editdrug';

/**
 * Generated class for the ShowdrugPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdrug',
  templateUrl: 'showdrug.html',
})
export class ShowdrugPage {
  items:any;
  public resposeData:any;
  public data:any;
  userData = {
    "id_drug": "",
    "drug_type": "",
    "drug_name": "",
    "drug_alarm": "",
    "drug_time": "",
    "drug_date": "",
    "id_patient":""
  };
  userDatap = {
    "id_patient": "",
    "id_doctor": ""
};
  userDetails = { "user_id": "" };
  public sid:any;
  getdata:any
  iduser:any
constructor(public app: App,public storage:Storage,public authService: AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  this.storage.get('userdata').then((val) => {
    var val = JSON.parse(val);
    this.userDetails.user_id = val;
    this.sid = this.userDetails.user_id;
    this.showdrug();
  });
  }
  ionViewDidEnter(){
    console.log('ionViewDidEnter ShowdrugPage');
    this.showdrug();
  }


  // ionViewDidLoad() {
  //   this.showdrug();
  //   console.log('ionViewDidLoad ShowdrugPage');
  // }
  gotop3(){
    this.navCtrl.push(P3Page,{id:this.userDatap.id_patient});
  }
  read(idu:string,type:string,name:string,alarm:string,time:string,date:string,id:string){
    this.navCtrl.push(EditdrugPage,{iduser:idu,typed:type,named:name,alarmd:alarm,timed:time,dated:date,idDrug:id})
  }

  showdrug(){
    this.userDatap.id_patient=this.sid;
    this.authService.PostData(this.userDatap, "getdrug").then((result)=>{
      this.resposeData = result;
      console.log(this.resposeData);
      if (this.resposeData.pattient) {
       this.data = this.resposeData.pattient; 
        this.items =this.data;
      }
     else {
        console.log(this.resposeData, "not conn");
     }
    }, (err) => {
      console.error(err);
    });
  }
}
