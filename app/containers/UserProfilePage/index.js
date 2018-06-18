import React, { Component} from 'react';
import ProfileImage from 'components/ProfileImage';
import FormSelectors from 'utils/genericFormSelectors';

import { withFirebase} from 'react-redux-firebase';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from './saga';
import reducer from './reducer';
import { loadProfile, loadedProfile } from './actions'
import { makeSelectCollection, makeSelectProfile, makeSelectNeedReload } from './selectors';
import { createStructuredSelector } from 'reselect';
import { USER_PROFILE_PATH } from 'components/Header/pages';
import { makeSelectLoggedInProfile } from 'containers/App/selectors';



class UserProfilePage extends Component{


    componentDidMount(){

                    
        this.loadProfile();
    }

    loadProfile(){
        const uid = this.props.match.params.uid;

        if (uid != this.props.firebase.auth().currentUser.uid){

            this.props.loadProfile(uid);
        }
        else{
            //Right, this isn't using state firebase, it's using uid
            this.props.alreadyLoaded(this.props.loggedInUser.profile);
        }
    }

    componentDidUpdate(){
        console.log("hello");
        if (this.props.needReload == true){
            console.log("how often do I happen?");
            this.loadProfile();
        }
    }

    render(){

        //It complains at me if I do this, but componentWillUpdate nor will mount is called if go to same page
        //url changes, yet doesn't re-render wtf. straight up is not called otherwise 
        //so like fuck else am I supposed to do? 
      
        
        const props = this.props;
        
        if (!props.profile ){
            return (<div><p> Profile loading </p></div>);
        }

        return (
            <div>

                <p> {props.profile.email}</p>
                

            </div>


        )

    }
}



const mapStateToProps = createStructuredSelector({

    needReload: makeSelectNeedReload(),
    loggedInUser: makeSelectLoggedInProfile(),
    profile: makeSelectProfile(),
    library: makeSelectCollection("library"),
    orders : makeSelectCollection("orders"),
    borrowed: makeSelectCollection("borrowed"),

});

function mapDispatchToProps(dispatch){

    return {
        loadProfile : (uid) => {
            return dispatch(loadProfile(uid));
        },
        alreadyLoaded: (profile) => {
            return dispatch(loadedProfile(profile));
        }
    }
}


const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withReducer = injectReducer({key:USER_PROFILE_PATH,reducer});
const withSaga = injectSaga({key:USER_PROFILE_PATH,saga})

export default compose(
    withConnect,
    withReducer,
    withFirebase,
    withSaga,
)(UserProfilePage);
