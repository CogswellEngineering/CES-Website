import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import _  from 'lodash';
import injectSaga from 'utils/injectSaga';
import saga from './saga';

import {makeSelectLoggedInProfile, makeSelectLoggedIn} from 'containers/App/selectors';
import {

    postNews,
    postEvent,
} from './actions';

import {ADMIN_PATH} from 'components/Header/pages';

import {
    Wrapper,
    OptionsPanel,
    Option,
} from 'components/StyledComponents/AdminPage';


import EventForm from 'components/StyledComponents/AdminPage/eventPostForm';
import NewsPostForm from 'components/StyledComponents/AdminPage/newsPostForm';

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

        this.toggleForm = this.toggleForm.bind(this);
        this.onAddNews = this.onAddNews.bind(this);
    }

    toggleForm = (evt) => {

        const target = evt.target;

        this.setState( state => {

            const form = target.name+"Open";
            const formOpen = !state[form];
            const newState = _.mapValues(state, () => false);
            newState[form] = formOpen;


            //Then set all other forms close.
            return newState;

        });

    }

    onAddNews = (post) => {


        console.log("More overhead, but better? Than passing loggedInProfile props over to News post? Lol");
        const {onAddNews, loggedInProfile} = this.props;
        
        const author = {
            name: this.props.loggedInProfile.displayName,
            uid: this.props.loggedInAuth.uid,
        };

        this.props.onAddNews(post, author);
    } 


    render(){


        //Todo, 
        //add buttons to alternate between these 2 forms.
        //add the onclick events and hook to sagas
        //Complete rest of the parts for EventForm.

        const {onAddEvent} = this.props;
        return (
            <Wrapper>

                <OptionsPanel>

                        <Option name = "newEventForm" onClick = {this.toggleForm} selected = {this.state.newEventFormOpen}>
                         Add Event </Option>

                        <Option name =  "newNewsPostForm" onClick = {this.toggleForm} selected = {this.state.newNewsPostFormOpen}>
                         Add News Post </Option>
                        
                </OptionsPanel>

                 { this.state.newEventFormOpen && <EventForm style = {{gridArea: "form"}} onSubmit = {onAddEvent} /> }

                 { this.state.newNewsPostFormOpen && <NewsPostForm  style = {{gridArea: "form"}} onSubmit = {this.onAddNews}  /> }

            </Wrapper>
        )

    }
}

const mapStateToProps = createStructuredSelector({

    loggedInAuth: makeSelectLoggedIn(),
    loggedInProfile: makeSelectLoggedInProfile(),
});

const mapDispatchToProps = dispatch => {


    return {

        onAddEvent: (post) => {

            return dispatch(postEvent(post));
        },

        onAddNews: (post, author) => {

            return dispatch(postNews(post,author));
        }
    };
}

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withSaga = injectSaga({key:ADMIN_PATH, saga});

export default compose(

    withConnect,
    withSaga

)(AdminPage);