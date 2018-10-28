import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { MessagesProvider } from '../../providers/messages/messages';
import { ActivitiesProvider } from '../../providers/activities/activities';

import { AboutPage } from "../about/about";


declare var Paho: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    private currentRoom: any = "Bedroom";
    private currentActivity: any = "Laughing";
    private timeInactive: any = 0;
    private lastActive = new Date();
    private timerGone: any = false;
    private mqttStatus: string = 'Disconnected';
    private mqttClient: any = null;
    private message: any = '';
    private messageToSend: string = '1,living,1,9';
    private topic: string = 'swen325/a3';
    private clientId: string = 'CJ_La_Fray'

    constructor(public navCtrl: NavController, private alertCtrl: AlertController, private messagesProvider: MessagesProvider, private activitiesProvider: ActivitiesProvider) {
        this.connect();
        this.checkForAlert();
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
        var result = m.split(",");
        this.messagesProvider.add(m);

        if (result[2] == 1) {
            this.timerGone = false;
            this.lastActive = new Date();
            this.currentRoom = this.capitalizeFirstLetter(result[1]);
            this.currentActivity = this.activitiesProvider.getActivity();
        }
    }

    checkForAlert(){
        let currentTime = new Date().getTime();

        this.timeInactive = currentTime - this.lastActive.getTime();
        this.timeInactive = this.timeInactive / 1000;

        this.timeInactive = this.timeInactive / 60;
        this.timeInactive = Math.round(this.timeInactive);

        if (this.timeInactive >= 5 && !this.timerGone) {
            navigator.serviceWorker.controller.postMessage(null);
            this.timerGone = true;
        }
   setTimeout(() => {
            this.checkForAlert();
        }, 1000);
    }

    capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1);
    }
}

