import { Injectable } from '@angular/core';

/*
  Generated class for the ActivitiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ActivitiesProvider {
    activities = [];

    constructor() {
        this.activities.push('Gyming', 'Tanning', 'Sculpting', 'Making a matchstick house', 'Complaining', 'Sleeping', 'Yelling', '' +
            'Crying', 'Laughing', 'Eating', 'Squatting', 'Watching TV', 'Painting', 'Staring at the wall')
    }


    getActivity() {
        let min = Math.ceil(0);
        let max = Math.floor(this.activities.length);
        let idx = Math.floor(Math.random() * (max - min)) + min;
        return this.activities[idx];
    }
}
