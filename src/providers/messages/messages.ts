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
    pieChartData:number[] = [350, 450, 100, 33, 500];

    batteryStatus: any =  {living:0, kitchen:2, dining:3, toilet:2, bedroom:1};
    motionStatus: any = [];

    constructor() {
    }

    parseMessage(message) {
        var result = message.split(",");
//console.log("result[1] = " +result[1]);
        if (result[1] == "living") {
            this.batteryStatus.living = result[3];
            this.pieChartData[0]+=parseInt(result[2]);
        } else if (result[1] == "kitchen") {
            this.batteryStatus.kitchen = result[3];
            this.pieChartData[1]+=parseInt(result[2]);

        } else if (result[1] == "dining") {
            this.batteryStatus.dining = result[3];
            this.pieChartData[2]+=parseInt(result[2]);

        } else if (result[1] == "toilet") {
            this.batteryStatus.toilet = result[3];
            this.pieChartData[3]+=parseInt(result[2]);

        } else if (result[1] == "bedroom") {
            this.batteryStatus.bedroom = result[3];
            this.pieChartData[4]+=parseInt(result[2]);

        }

    }

    parseBattery(){

    }

//1,living,1,1
    add(message) {
        //this.messages.add(message);
        this.parseMessage(message);

    }

    getMovements() {

        return this.pieChartData;
    }

    getVoltages() {
        console.log("living voltage = " + this.batteryStatus.living);
        let barChartData = [
            { data: [this.batteryStatus.living, this.batteryStatus.kitchen,
                    this.batteryStatus.dining, this.batteryStatus.toilet, this.batteryStatus.bedroom], label: 'Voltage', backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ] },

        ];

        return barChartData;
    }
}
