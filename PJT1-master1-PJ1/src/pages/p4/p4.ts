import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SN1 } from '../sn1/sn1';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the P4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-p4',
  templateUrl: 'p4.html',
})
export class P4Page {
  userData = {
    "id_patient":"",
    "name_hospital": "",
    "name_docter": "",
    "dat_date": "",
    "dat_time": ""
  };
  userDatap = {
    "id_patient": "",
    "id_doctor": ""
  };
  public resposeData:any;
  public sid:any;
  userDetails = { "user_id": "" };

  constructor(private storage: Storage,public authService: AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.storage.get('userdata').then((val)=>{
      var val = JSON.parse(val);
      this.userDetails.user_id = val
      this.sid = this.userDetails.user_id
      console.log(this.sid);
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad P4Page');
  }
  backhomee(){
    this.navCtrl.push(SN1);
  }
  create(){
    this.userData.id_patient = this.sid
    console.log(this.userData);
    this.authService.PostData(this.userData, "adddatdoc").then((result)=> {
      this.resposeData = result;
      console.log(this.resposeData)
      this.navCtrl.pop();
     });
    
  }
  
}
