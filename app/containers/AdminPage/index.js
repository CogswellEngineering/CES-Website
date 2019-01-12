import React, {Component} from 'react';
import {compose} from 'redux';
import injectSaga from 'utils/injectSaga';
import saga from './saga';

import {ADMIN_PATH} from 'components/Header/pages';



//Everything admin page will have:
/*

    Button to add new news post
    Button to post new event

    respective component rendered depending on button pressed.
    -NewEventForm
    -NewNewsPostForm


*/
class AdminPage extends Component{


    constructor(props){


        super(props);

        this.state = {

            newEventFormOpen: false,
            newNewsPostFormOpen: false,
        }
    }



    render(


    )
}




const withSaga = injectSaga({key:ADMIN_PATH, saga});

export default compose(

    withSaga

)(AdminPage);