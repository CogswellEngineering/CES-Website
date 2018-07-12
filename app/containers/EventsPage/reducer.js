import { fromJS } from 'immutable';
import {

    MONTH_PRESSED,
    EVENT_PRESSED,
    EVENTS_UPDATED,
    EVENT_LOADING,
    EVENT_CLOSED,
    ATTEND_FAILED,
    VERIFIED_ATTENDING,

} from './constants';




const initialState = fromJS({


    clickedEvent: null,

    //Though again this is specific to component
    //gotta work on moving stuff around later but for now fuck it.
    //Also since just booleans, it's more stuff to wait for merge on.
    isAttendee: false,
    loadingEvent:false,
    month:"April",
    //This for didUpdate to check if should change query of event listener.
   
    //Nevermind, might not do this, cause will keep showing agenda so people can see whole year's
    //events on one page.
   // lastMonthPicked:"",
    events:[],
    error:"",

    //This is submitting
    tryingToAttend:false,

});


export default function eventReducer(state = initialState, action){


    console.log("State:",state,"Action",action);

    switch(action.type){

        case MONTH_PRESSED:

            return state
                .set("month",action.month);
        


        case EVENT_LOADING:

            return state
                .set("loadingEvent",true);

        //Priority to test on this page, also need to test / fix update profile again but pretty sure
        //it was a stupid using ref problem
        case VERIFIED_ATTENDING:

            return state
                .set("loadingEvent",false)
                .set("isAttendee",action.isAttending)
                .set("clickedEvent", action.event)
                .set("tryingToAttend",false);

        case EVENT_CLOSED:
            
            console.log("closed event");
            //Attending would be already false if able to close.
            return state
                .set("clickedEvent", null)
                .set("justAttended", false);

        case EVENTS_UPDATED:

            return state
                .set("events",action.events);

                
        case ATTEND_FAILED:

        //Will use the ones in generic selectors for the booleans.
            return state
                .set("error",action.error)
                .set("justAttended",false)
                .set("tryingToAttend",false);


        default:
        
            return state;

    }

}


