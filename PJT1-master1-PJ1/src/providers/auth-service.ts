import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
// localhost
//let apiUrl = "http://127.0.0.1/api/";
//ipWIFI
let apiUrl = "http://192.168.1.124/api/";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }
   PostData(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      },(err) =>{
        reject(err);
      });

      });
    
  }
}
