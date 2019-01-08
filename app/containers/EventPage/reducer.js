import fromJS from 'immutable';

import {

    LOADED_EVENT,
    ATTENDANCE_UPDATED,
    EVENT_TRACKING_UPDATED,
} from './constants';


const initialState = fromJS({


    loadedEvent: null,
    attendance: false,
    tracking: false,

});

export default function reducer( state = initialState, action){


    switch (action.type){

        case LOADED_EVENT:

            return state
                .set("loadedEvent", action.event);

        case ATTENDANCE_UPDATED:

            return state
                .set("attendance", action.isAttending);

        case EVENT_TRACKING_UPDATED:

            return state
                .set("tracking", action.isTracking);
    }

}