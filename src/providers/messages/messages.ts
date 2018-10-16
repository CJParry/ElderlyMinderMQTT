import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MessagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessagesProvider {
  messages: any = [];
  timestamps: any = [];
  batteryStatus: any =  {living:0, kitchen:2, dining:3, toilet:2, bedroom:1};
  motionStatus: any = [];

  constructor() {
  }

  parseMessage(message) {
    var result = message.split(",");
console.log("result[1] = " +result[1]);
    if (result[1] == "living") {
      this.batteryStatus.living = result[3];      
    } else if (result[1] == "kitchen") {
      this.batteryStatus.kitchen = result[3];
    } else if (result[1] == "dining") {
      this.batteryStatus.dining = result[3];
    } else if (result[1] == "toilet") {
      this.batteryStatus.toilet = result[3];
    } else if (result[1] == "bedroom") {
      this.batteryStatus.bedroom = result[3];
    }

  }

//1,living,1,1
  add(message) {
    console.log("message in provider= " + message);
    //this.messages.add(message);
    console.log("messages ="+this.messages);
    this.parseMessage(message);

  }

  getMovements() {

    return this.messages;
  }

  getVoltages() {
    console.log("living voltage = " + this.batteryStatus.living);
    let barChartData = [
      { data: [this.batteryStatus.living, this.batteryStatus.kitchen, this.batteryStatus.dining, this.batteryStatus.toilet, this.batteryStatus.bedroom], label: 'Voltage' }
    ];

    return barChartData;
  }
}
