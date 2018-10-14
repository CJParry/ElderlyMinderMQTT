import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var Paho: any;

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {
	private currentRoom: any = "Wellington Hospital";
	private timeInactive: any = 2;
	private lastActive = new Date();

	private mqttStatus: string = 'Disconnected';
	private mqttClient: any = null;
	private message: any = '';
	private messageToSend: string = 'Your message';
	private topic: string = 'swen325/a3';
	private clientId: string = 'yourName'

	constructor(public navCtrl: NavController) {

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
		this.parseMessage();

	}

	parseMessage() {
		var result = this.message.split(",");
		
		console.log("message = " + this.message);
		//currentActivity = 'squatting';
		console.log("room = " + this.currentRoom);
		console.log("result = " + result[1]);

		if (result[2] == 1) {
			this.lastActive = new Date();
			this.currentRoom = result[1];

		}
		let currentTime = new Date().getTime();

		this.timeInactive = currentTime - this.lastActive.getTime();
		this.timeInactive = this.timeInactive / 1000;
		this.timeInactive = this.timeInactive / 60;
		this.timeInactive = Math.round(this.timeInactive);

		console.log("updatedroom = " + this.currentRoom);

	}
}
