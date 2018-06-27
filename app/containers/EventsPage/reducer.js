import { fromJS } from 'immutable';
import {

    MONTH_PRESSED,
    EVENT_PRESSED,
    EVENTS_UPDATED,
    EVENT_LOADING,
    EVENT_CLOSED,
    ATTEND_FAILED,
    //With this basically means do need to have prop for it
    //well fuck it, it makes sense here though it's more for inner component, just passing hella shit to it.
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
    error:""
    //This feels like something should be in EventInfo, not here, cause error and this will just be passing to EventInfo
    justAttended:false,

    //This is submitting
    tryingToAttend:false,

});


function eventReducer(state = initialState, action){


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
                .set("clickedEvent", action.event);

        case EVENT_CLOSED:
            
            //Attending would be already false if able to close.
            return state
                .set("clickedEvent", null)
                .set("justAttended", false);

        case EVENTS_UPDATED:

            return state
                .set("events",action.events);


        case ATTENDING:

            return state
                .set("tryingToAttend",true);
                
        case ATTEND_FAILED:

        //Will use the ones in generic selectors for the booleans.
            return state
                .set("error",action.error)
                .set("justAttended",false)
                .set("tryingToAttend",false);


        case ATTEND_SUCCESS:

            return state
                .set("justAttended",true)
                .set("tryingToAttend",false);



    }

}


