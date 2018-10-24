import { Injectable } from '@angular/core';

/**
 * Class which provides a random activity, to make app more fun
 */
@Injectable()
export class ActivitiesProvider {
    activities = [];

    constructor() {
        this.activities.push('Gyming', 'Tanning', 'Sculpting', 'Making a matchstick house', 'Complaining', 'Sleeping', 'Yelling', +
            'Crying', 'Laughing', 'Eating', 'Squatting', 'Watching TV', 'Painting', 'Staring at the wall', 'Chess', 'Checkers', 'Gang signs')
    }

    getActivity() {
        let min = Math.ceil(0);
        let max = Math.floor(this.activities.length);
        let idx = Math.floor(Math.random() * (max - min)) + min;
        return this.activities[idx];
    }
}
