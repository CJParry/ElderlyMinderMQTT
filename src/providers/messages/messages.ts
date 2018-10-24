import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MessagesProvider {
    messages: any = [];
    timestamps: any = [];
    pieChartData:number[] = [350, 450, 100, 33, 500];
    flatBatteries:any=[];
    batteryStatus: any =  {living:67, kitchen:92, dining:53, toilet:42, bedroom:91};
    motionStatus: any = [];

    parseMessage(message) {
        var result = message.split(",");
        if (result[1] == "living") {
            this.flatBatteries=[];
            this.batteryStatus.living = result[3];
            this.pieChartData[0]+=parseInt(result[2]);

            if(result[3]<15){
                this.flatBatteries.push("Living - " + result[3] + "%")
            }
        } else if (result[1] == "kitchen") {
            this.batteryStatus.kitchen = result[3];
            this.pieChartData[1]+=parseInt(result[2]);

            if(result[3]<15){
                this.flatBatteries.push("Kitchen - " + result[3]+ "%")
            }
        } else if (result[1] == "dining") {
            this.batteryStatus.dining = result[3];
            this.pieChartData[2]+=parseInt(result[2]);

            if(result[3]<15){
                this.flatBatteries.push("Dining - " + result[3]+ "%")
            }
        } else if (result[1] == "toilet") {
            this.batteryStatus.toilet = result[3];
            this.pieChartData[3]+=parseInt(result[2]);

            if(result[3]<15){
                this.flatBatteries.push("Toilet - " + result[3]+ "%")
            }
        } else if (result[1] == "bedroom") {
            this.batteryStatus.bedroom = result[3];
            this.pieChartData[4]+=parseInt(result[2]);

            if(result[3]<15){
                this.flatBatteries.push("Bedroom - " + result[3]+ "%")
            }
        }
    }

    resetBatteries(){
        this.flatBatteries = [];
    }

    getFlatBatteries(){
        return this.flatBatteries;
    }

    add(message) {
        this.parseMessage(message);
    }

    getMovements() {
        return this.pieChartData;
    }

    getVoltages() {
        let barChartData = [
            { data: [this.batteryStatus.living, this.batteryStatus.kitchen,
                    this.batteryStatus.dining, this.batteryStatus.toilet, this.batteryStatus.bedroom], label: 'Percentage %', backgroundColor: [
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
