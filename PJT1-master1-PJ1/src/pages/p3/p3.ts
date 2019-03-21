import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SN1 } from '../sn1/sn1';
import { AuthServiceProvider } from '../../providers/auth-service';
import { ShowdrugPage } from '../showdrug/showdrug';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the P3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-p3',
  templateUrl: 'p3.html',
})
export class P3Page {
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
  public timee:string
  public datee:string
  public resposeData:any;
  userDetails = { "user_id": "" };
  public sid:any;

  constructor(public authService: AuthServiceProvider, public storage:Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.storage.get('userdata').then((val) =>{
      var val = JSON.parse(val);
      this.userDetails.user_id = val;
      this.sid = this.userDetails.user_id;
        console.log(this.sid);
        
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad P3Page');
  }
  backhomee(){
    this.navCtrl.pop();
  }
  savee(){
    this.userData.id_patient = this.sid
    console.log(this.timee);
    console.log(this.datee);
    this.userData.drug_time = this.timee
    this.userData.drug_date = this.datee
    console.log(this.userData);
    this.authService.PostData(this.userData, "adddrug").then((result)=> {
      this.resposeData = result;
      console.log(this.resposeData)
    });
    this.navCtrl.pop();
  }
}
