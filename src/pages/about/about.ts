import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
// Doughnut
public doughnutChartLabels:string[] = ['Living', 'Kitchen', 'Dining', 'Bedroom', 'Toilet'];
public doughnutChartData:number[] = [350, 450, 100, 33, 500];
public doughnutChartType:string = 'doughnut';

  constructor(public navCtrl: NavController) {

  }

  // events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}
}




