import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { MessagesProvider } from '../../providers/messages/messages';
import { AboutPage } from "../about/about";

declare var Paho: any;

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {
	private currentRoom: any = "?";
	private timeInactive: any = 0;
	private lastActive = new Date();
	private timerGone: any = false;
	private mqttStatus: string = 'Disconnected';
	private mqttClient: any = null;
	private message: any = '';
	private messageToSend: string = '1,living,1,9';
	private topic: string = 'swen325/a3';
	private clientId: string = 'CJ_La_Fray'

    ionViewWillEnter(){
        this.update();    }

// Doughnut
    public pieChartLabels:string[] = ['Living', 'Kitchen', 'Dining', 'Bedroom', 'Toilet'];
    public pieChartData:number[] = [350, 450, 100, 33, 500];
    public pieChartType:string = 'pie';



    constructor(public navCtrl: NavController, private alertCtrl: AlertController, private messagesProvider: MessagesProvider) {
		this.connect();
	}

	public connect = () => {
		this.mqttStatus = 'Connecting...';
		//this.mqttClient = new Paho.MQTT.Client('m10.cloudmqtt.com', 31796, '/mqtt', this.clientId);
		this.mqttClient = new Paho.MQTT.Client('barretts.ecs.vuw.ac.nz', 8883, '/mqtt', this.clientId);

		// set callback handlers
		this.mqttClient.onConnectionLost = this.onConnectionLost;
		this.mqttClient.onMessageArrived = this.onMessageArrived;

		// connect the client
		console.log('Connecting to mqtt via websocket');
		//this.mqttClient.connect({timeout:10, userName:'ptweqash', password:'ncU6vlGPp1mN', useSSL:true, onSuccess:this.onConnect, onFailure:this.onFailure});
		this.mqttClient.connect({ timeout: 10, useSSL: false, onSuccess: this.onConnect, onFailure: this.onFailure });
	}

	public disconnect() {
		if (this.mqttStatus == 'Connected') {
			this.mqttStatus = 'Disconnecting...';
			this.mqttClient.disconnect();
			this.mqttStatus = 'Disconnected';
		}
	}

	public sendMessage() {
		if (this.mqttStatus == 'Connected') {
			this.mqttClient.publish(this.topic, this.messageToSend);
		}else{
			this.parseMessage(this.messageToSend);
		}
	}

	public onConnect = () => {
		console.log('Connected');
		this.mqttStatus = 'Connected';

		// subscribe
		this.mqttClient.subscribe(this.topic);
	}

	public onFailure = (responseObject) => {
		console.log('Failed to connect');
		this.mqttStatus = 'Failed to connect';
	}

	public onConnectionLost = (responseObject) => {
		if (responseObject.errorCode !== 0) {
			this.mqttStatus = 'Disconnected';
		}
	}

	public onMessageArrived = (message) => {
		console.log('Received message');
		this.message = message.payloadString;
		this.parseMessage(this.message);

	}

	parseMessage(m) {
		console.log(m);
		//var result = this.message.split(",");
		var result = m.split(",");

	//	this.messagesProvider.add(this.message);
		this.messagesProvider.add(m);

		//currentActivity = 'squatting';
		if (result[2] == 1) {
			this.timerGone = false;

			this.lastActive = new Date();
			this.currentRoom = result[1];

		}
		let currentTime = new Date().getTime();

		this.timeInactive = currentTime - this.lastActive.getTime();
		this.timeInactive = this.timeInactive / 1000;
		this.timeInactive = this.timeInactive / 60;
		this.timeInactive = Math.round(this.timeInactive);
		if (this.timeInactive >= 2 && !this.timerGone) {
			this.presentAlert();
			this.timerGone = true;
		}

	}

	presentAlert() {
		let alert = this.alertCtrl.create({
			title: 'Inactivity Warning',
			subTitle: 'Old person has been inactive for 2 minutes',
			buttons: ['Dismiss']
		});
		alert.present();
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
        console.log("in update");

    }
}

