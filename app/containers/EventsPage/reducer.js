import { fromJS } from 'immutable';
import {

    MONTH_PRESSED,
    EVENT_PRESSED,
    EVENTS_UPDATED,
    EVENT_LOADING,
    EVENT_CLOSED,
    ATTEND_FAILED,
    VERIFIED_ATTENDING,
    FILTER_CHANGED,

} from './constants';




const initialState = fromJS({


    clickedEvent: null,

    //Though again this is specific to component
    //gotta work on moving stuff around later but for now fuck it.
    //Also since just booleans, it's more stuff to wait for merge on.
    isAttendee: false,
    loadingEvent:false,
    //This for didUpdate to check if should change query of event listener.
   
    //Nevermind, might not do this, cause will keep showing agenda so people can see whole year's
    //events on one page.
   // lastMonthPicked:"",
    events:[],
    //This will contain strings equal to event types.
    //If empty, then no filte applied, pull everything without where clause from database.
    
    filter:[],

    //This is submitting
    tryingToAttend:false,

});


export default function eventReducer(state = initialState, action){



    switch(action.type){


        case FILTER_CHANGED:

            console.log("filter changed action", action);

            return state
                .set("filter", action.newFilter);


        //Priority to test on this page, also need to test / fix update profile again but pretty sure
        //it was a stupid using ref problem
        case VERIFIED_ATTENDING:

            return state
                .set("isAttendee",action.isAttending)
                .set("clickedEvent", action.eventCard)

        case EVENT_CLOSED:
            
            //Attending would be already false if able to close.
            return state
                .set("clickedEvent", null)

        case EVENTS_UPDATED:

            return state
                .set("events",action.events);

        default:
        
            return state;

    }

}


