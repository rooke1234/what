import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SN1 } from '../sn1/sn1';
import { ShowmePage } from '../showme/showme';
import { AuthServiceProvider } from '../../providers/auth-service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the InfouserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-infouser',
  templateUrl: 'infouser.html',
})
export class InfouserPage {
  public resposeData:any;
  public data:any;
  public editUser:any;
  public infouser:any;
  public sid:any;
  public x:string = "aaaaa"
  public userData:any ={
    "id_patient": "",
    "id_doctor": "",
    "name_patient": "",
    "gender_patient" :"",
    "weight_patient" :"",
    "height_patient" :"",
    "year_patient" :"",
    "hisdrug_patient" :"",
    "dis_patient" :"",
    "doc_patient" :"",
    "hos_patient" :"",
    "doctel_patient" :"",
    "tel_patient" :""
  };

  userDatap = {
    "id_patient": ""
  
  };
  public id:any
  public getid:any;
  public getname:any;
  public getgender:any;
  public getheight:any;
  public getyear:any;
  public gethisdrug:any;
  public getdoc:any;
  public gettel:any;
  public getdis:any;
  public gethos:any;
  public getdoctel:any;

  public dataUser:any={
    "id_patient":"",
    "name_patient":"",
    "gender_patient" :"",
    "weight_patient" :"",
    "height_patient" :"",
    "year_patient" :"",
    "hisdrug_patient" :"",
    "dis_patient" :"",
    "doc_patient" :"",
    "hos_patient" :"",
    "doctel_patient" :"",
    "tel_patient" :""
  };
  userDetails = { "user_id": "" };
  constructor(public app: App, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public toastCtrl: ToastController) {
    this.storage.get('userData').then((val) => {
      var val = JSON.parse(val);
      this.userDetails.user_id = val;
      this.sid = this.userDetails.user_id;
     this.getid = navParams.get('id');
     this.getname = this.navParams.get('n');
     this.getgender = this.navParams.get('g');
     this.getheight = this.navParams.get('h');
     this.getyear = this.navParams.get('y'); 
     this.gethisdrug = this.navParams.get('his'); 
     this.getdoc = this.navParams.get('d'); 
     this.gettel = this.navParams.get('t'); 
     this.getdis= this.navParams.get('dis'); 
     this.gethos = this.navParams.get('hos');
     this.getdoctel = this.navParams.get('dt');   
    
     this.getAccount();
     
    });
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfouserPage');
  }
  gosn1(){
    this.navCtrl.push(SN1);
  }

  openGallery(){
    //const option 
  }
  getAccount() {
    this.userDatap.id_patient = this.getid;
    console.log(this.userDatap);
    this.authService.PostData(this.userDatap, "getAccountPatient").then((result) => {
      this.resposeData = result;
      if (this.resposeData.patient) {
        this.data = this.resposeData.patient;
        this.infouser = this.data
        console.log(this.data)
      }
      else {
        console.log(this.resposeData, "not conn");
      }
    }, (err) => { 
      console.error(err);
    });
  }
  editinfo(){
    this.dataUser.id_patient = this.getid;
    this.dataUser.name_patient = this.getname;
    this.dataUser.gender_patient = this.getgender;
    this.dataUser.height_patient = this.getheight;
    this.dataUser.year_patient = this.getyear;
    this.dataUser.hisdrug_patient = this.gethisdrug;
    this.dataUser.doc_patient = this.getdoc;
    this.dataUser.tel_patient = this.gettel;
    this.dataUser.dis_patient = this.getdis;
    this.dataUser.hos_patient = this.gethos;
    this.dataUser.doctel_patient = this.getdoctel;
    console.log(this.dataUser);
    this.authService.PostData(this.dataUser, "editAccountPatient").then((result)=>{
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
    this.navCtrl.pop()
  }

  // editAccount() {
  //   this.userDatap.id_patient = this.sid;
  //   this.authService.PostData(this.userDatap, "editAccountPatient").then((result) => {
  //     this.resposeData = result;
  //     if (this.resposeData.patient) {
  //       this.data = this.resposeData.patient;
  //       console.log(this.data)
  //     }
  //     else {
  //       console.log(this.resposeData, "not conn");
  //     }
  //     this.navCtrl.push(ShowmePage);
  //   }, (err) => {
  //     console.error(err);
  //   });
   
  // }
  
  
}
