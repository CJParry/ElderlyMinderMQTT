import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MessagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessagesProvider {

  constructor() {
    console.log('Hello MessagesProvider Provider');
  }

  add(message){
    console.log("message in provider= " + message);

  }

}
