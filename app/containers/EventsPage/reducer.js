import { fromJS } from 'immutable';
import {

    MONTH_PRESSED,
    EVENT_PRESSED,
    EVENTS_UPDATED,
    EVENT_CLOSED,

} from './constants';




const initialState = fromJS({


    clickedEvent: null,
    month:"April",
    //This for didUpdate to check if should change query of event listener.
   
    //Nevermind, might not do this, cause will keep showing agenda so people can see whole year's
    //events on one page.
   // lastMonthPicked:"",
    events:[],


});


function eventReducer(state = initialState, action){


    switch(action.type){

        case MONTH_PRESSED:

            return state
                .set("month",action.month);
        
        case EVENT_PRESSED:

            return state
                .set("clickedEvent",action.event);

        case EVENT_CLOSED:
            
            return state
                .set("clickedEvent", null);

        case EVENTS_UPDATED:

            return state
                .set("events",action.events);

        case 

    }

}


