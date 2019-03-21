import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
import { ShowdrugPage } from '../showdrug/showdrug';

/**
 * Generated class for the EditdrugPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editdrug',
  templateUrl: 'editdrug.html',
})
export class EditdrugPage {
  getType:any
  getName:any
  getAlarm:any
  getTime:any
  getDate:any
  getIddrug:any
  public resposeData:any;
  userDetails = { "user_id": "" };
  public sid:any;

  userData = {
    "id_drug": "",
    "drug_type": "",
    "drug_name": "",
    "drug_alarm": "",
    "drug_time": "",
    "drug_date": "",
    "id_patient":""
  };

  constructor(public app: App,public storage:Storage,public authService: AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.storage.get('userdata').then((val) =>{
      var val = JSON.parse(val);
      this.userDetails.user_id = val;
      this.sid = this.userDetails.user_id;
        console.log(this.sid);
      });
    this.getType = navParams.get('typed')
    this.getName = navParams.get('named')
    this.getAlarm = navParams.get('alarmd')
    this.getTime = navParams.get('timed')
    this.getDate = navParams.get('dated')
    this.getIddrug = navParams.get('idDrug')
    }
  ionViewDidLoad(){
    console.log('ionViewDidLoad EditdrugPage');
  }
  edit(){
    this.userData.id_drug = this.getIddrug
    this.userData.drug_type = this.getType
    this.userData.drug_name = this.getName
    this.userData.drug_alarm = this.getAlarm
    this.userData.drug_time = this.getTime
    this.userData.drug_date = this.getDate
    this.userData.id_patient = this.sid
    console.log(this.userData);
    this.authService.PostData(this.userData, "editdrug").then((it)=>{
      this.resposeData = it
      if (this.resposeData.pattient) {
        console.log(this.resposeData, "sss");
      }
     else {
        console.log(this.resposeData, "not conn");
     }
    }, (err) => {
      console.error(err);
    });
    this.navCtrl.pop();
  }
  del(){
    this.authService.PostData(this.getIddrug, "deleteDrug").then((result)=>{
     this.navCtrl.pop();
    }, (err) => {
      console.error(err);
    });
  }
}

