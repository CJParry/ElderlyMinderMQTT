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
    responsive: true
  };
  public barChartLabels: string[] = ['Living', 'Kitchen', 'Dining', 'Toilet', 'Bedroom'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  // public barChartData: any[] = [
  //   { data: [28, 48, 40, 19, 86], label: 'Voltage' }
  // ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public update(): void {
    this.barChartData = this.messagesProvider.getVoltages();
console.log("in update");

  }
}