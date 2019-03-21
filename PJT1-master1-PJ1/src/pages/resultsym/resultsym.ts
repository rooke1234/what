import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,App } from 'ionic-angular';
import { P2Page } from '../p2/p2';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ResultsymPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultsym',
  templateUrl: 'resultsym.html',
})
export class ResultsymPage {

  public resposeData:any;
  public data:any;

  public sid:any;
  userData = {
    "data_dat": "",
    "one": "",
    "two": "",
    "tree": "",
    "four": "",
    "five": "",
    "six": "",
    "seven": "",
    "id_patient": "id_patient"
  };

  userDatap = {
    "id_patient": ""
  
  };
  id:any;
  userDetails = { "user_id": "" };
  constructor(public app: App, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, 
    public authService: AuthServiceProvider, public toastCtrl: ToastController) {
    this.storage.get('userData').then((val) => {
      var val = JSON.parse(val);
      this.userDetails.user_id = val;
      this.sid = this.userDetails.user_id;
      
      this.userDatap.id_patient = navParams.get('id')
      console.log(this.userDatap);
      this.id = this.userDatap.id_patient;
      console.log(this.id);
      this.getActivity();
      
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsymPage');
    this.getActivity(); 
  }
  
  gop2(){
    this.navCtrl.push(P2Page);
  }
  getActivity() {
    this.authService.PostData(this.id, "showActivity").then((result) => {
      this.resposeData = result;
      if (this.resposeData.pattient) {
        this.data = this.resposeData.pattient;
        console.log(this.data);
        
        console.log(this.resposeData);
        
      }
      else {
        console.log(this.resposeData, "not conn");
      }
    }, (err) => {
      console.error(err);
    });
  }

  delActivity(){
    console.log(this.userData)
    this.authService.PostData(this.userData, "delActivity").then((result) =>{
      this.resposeData = result;
      console.log(this.resposeData);
      if(this.resposeData.pattient){
        this.presenToast("ลบข้อมูลเรียบร้อยแล้ว");
      }
      
      else{
        this.presenToast("ลบข้อมูลไม่ได้");

      }
      this.getActivity(); 
      // this.navCtrl.push(ResultsymPage);
      }, (err) => {
      
      });
     
    
  }
  presenToast(msg) {
    let toast = this
      .toastCtrl
      .create({message: msg,duration: 2000});
    toast.present();
  }
}
