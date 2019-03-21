import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service';
import { P4Page } from '../p4/p4';
import { EditdatPage } from '../editdat/editdat';

/**
 * Generated class for the ShowdocPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdoc',
  templateUrl: 'showdoc.html',
})
export class ShowdocPage {
  items:any;
  public resposeData:any;
  public data:any;
  userData = {
    "id_datdoc": '',
    "name_hospital": "",
    "name_docter":"", 
    "dat_date": "",
    "dat_time": "",
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
    this.storage.get('userdata').then((val) =>{
     var val = JSON.parse(val);
     this.userDetails.user_id = val;
     this.sid = this.userDetails.user_id;
        console.log(this.sid);
       this.showdoc();
     });
    }


  
  gotop4(){
    this.navCtrl.push(P4Page);
  }
  read(idu:string,namehospital:string,namedoc:string,date:string,time:string,id:string){
    this.navCtrl.push(EditdatPage,{iduser:idu,namehospitald:namehospital,namedocd:namedoc,dated:date,timed:time,idDatdoc:id})
  }
  
  ionViewDidEnter(){
    this.showdoc();
    console.log('ionViewDidEnter ShowdocPage');
  }
  showdoc(){
   
    this.authService.PostData(this.sid, "getdatdoc").then((result)=>{
      this.resposeData = result;
      console.log(result)
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
