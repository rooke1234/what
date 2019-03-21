import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EditstoryPage } from '../editstory/editstory';
import { AuthServiceProvider } from '../../providers/auth-service';
import { StorydocPage } from '../storydoc/storydoc';

/**
 * Generated class for the StorybydocPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-storybydoc',
  templateUrl: 'storybydoc.html',
})
export class StorybydocPage {
  getTopic:any
  getDetail:any
  getIdstory:any
  resposeData:any

  constructor(public alertCtrl: AlertController,public authService: AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.getTopic = navParams.get('topic')
    this.getDetail = navParams.get('detail')
    this.getIdstory = navParams.get('idStory')
    console.log("topic"+this.getTopic);
    console.log(this.getDetail);
    console.log(this.getIdstory);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StorybydocPage');
  }
  edit(){
    this.navCtrl.push(EditstoryPage,{topic2:this.getTopic,detail2:this.getDetail,id2:this.getIdstory})
  }
  del(){
    this.authService.PostData(this.getIdstory, "deleteStory").then((result)=>{
      this.resposeData = result;
      console.log(result)
     this.navCtrl.pop();
    }, (err) => {
      console.error(err);
    });
  }


}
