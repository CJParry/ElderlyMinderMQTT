import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MessagesProvider } from '../../providers/messages/messages';

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})

export class ContactPage {

    ionViewWillEnter(){
        this.update();    }

    public barChartData: any[] = [];
    constructor(public navCtrl: NavController, public messagesProvider: MessagesProvider) {
        this.barChartData = messagesProvider.getVoltages();
    }

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        scales : {
            yAxes: [{
                ticks: {
                    steps : 10,
                    stepValue : 10,
                    max : 100,
                    min: 0
                }
            }]
        }
    };

    public barChartLabels: string[] = ['Living', 'Kitchen', 'Dining', 'Toilet', 'Bedroom'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public barChartColors: any [] =[
        {
            backgroundColor:'#0000ff',
            borderColor: "rgba(10,150,132,1)",
            borderWidth: 1
        },
        {
            backgroundColor:'rgb(97 174 55, 1 )',
            borderColor: "rgba(10,150,132,1)",
            borderWidth: 5,
        }
    ]

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public update(): void {
        setTimeout(() => {
            this.update();
        }, 1000);
        this.barChartData = this.messagesProvider.getVoltages();
    }
}
