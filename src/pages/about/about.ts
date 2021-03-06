import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MessagesProvider } from '../../providers/messages/messages';


@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {
    ionViewWillEnter(){
        this.update();    }

// Doughnut
    public pieChartLabels:string[] = ['Living', 'Kitchen', 'Dining', 'Toilet', 'Bedroom'];
    public pieChartData:number[] = [1, 1, 1, 1, 1];
    public pieChartType:string = 'pie';

    constructor(public navCtrl: NavController, public messagesProvider: MessagesProvider) {
    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    public update(): void {
        this.pieChartData = this.messagesProvider.getMovements();
    }
}




