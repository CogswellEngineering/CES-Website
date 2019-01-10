import {fromJS} from 'immutable';

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