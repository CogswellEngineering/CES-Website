//This will handle call to upload attendees for a selected event.
import { takeLatest, put, call } from 'react-saga/effects';
import { ATTEND_PRESSED, } from './constants';


function* attendEvent(action){

    const attendee = action.uid;
    const event = action.event;

}

function* eventsWatcher(){

    yield takeLatest(ATTEND_PRESSED, attendEvent);
}