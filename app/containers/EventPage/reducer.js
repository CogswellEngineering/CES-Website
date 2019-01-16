import {fromJS} from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import {

    LOADED_EVENT,
    ATTENDANCE_UPDATED,
    EVENT_TRACKING_UPDATED,
} from './constants';


const initialState = fromJS({


    loadedEvent: null,
    isAttending: false,
    isTracking: false,

});

export default function reducer( state = initialState, action){


    switch (action.type){


        //Will get rid of it persisting problem
        //Though later I do want to cache to reuse instead of repulling.
        case LOCATION_CHANGE:

            return initialState;
        case LOADED_EVENT:


            return state
                .set("loadedEvent", action.event);

        case ATTENDANCE_UPDATED:

            return state
                .set("isAttending", action.isAttending);

        case EVENT_TRACKING_UPDATED:

            return state
                .set("isTracking", action.isTracking);

        default:
            return state;
    }

}