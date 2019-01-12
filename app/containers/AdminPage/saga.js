import {takeLatest, put} from 'react-saga/effects';
import{

    POST_NEWS,
    POST_EVENT
} from './constants';


function* postEvent(payload){


    const {post} = payload;

}

function* postNews(payload){

    const {post} = payload;
}


export default function* saga(){


    yield takeLatest(POST_EVENT, postEvent);
    yield takeLatest(POST_NEWS, postNews);

}