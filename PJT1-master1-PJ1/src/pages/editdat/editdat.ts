import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';
import { ShowdocPage } from '../showdoc/showdoc';

/**
 * Generated class for the EditdatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editdat',
  templateUrl: 'editdat.html',
})
export class EditdatPage {
  getNamehospital:any
  getNamedoc:any
  getDate:any
  getTime:any
  getIddatdoc:any
  resposeData:any;
  userData = {
    "id_datdoc": '',
    "name_hospital": "",
    "name_docter":"", 
    "dat_date": "",
    "dat_time": "",
    "id_patient":""
  };
  constructor(public app: App,public storage:Storage,public authService: AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.getNamehospital = navParams.get('namehospitald')
    this.getNamedoc = navParams.get('namedocd')
    this.getDate = navParams.get('dated')
    this.getTime = navParams.get('timed')
    this.getIddatdoc = navParams.get('idDatdoc')
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditdatPage');
  }
  editdata(){
    this.userData.id_datdoc = this.getIddatdoc
    this.userData.name_hospital = this.getNamehospital
    this.userData.name_docter = this.getNamedoc
    this.userData.dat_date = this.getDate
    this.userData.dat_time = this.getTime
    console.log(this.userData);
    this.authService.PostData(this.userData, "editdatdoctor").then((result)=>{
      this.resposeData = result;  
      console.log(result)
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
    this.authService.PostData(this.getIddatdoc, "deleteDatdoc").then((result)=>{
      this.resposeData = result;
      console.log(result)
      this.navCtrl.pop();
    }, (err) => {
      console.error(err);
    });
  }

}
