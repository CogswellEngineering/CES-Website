//Essentially display all users. Will have filter based on concentration.
import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import styled from 'styled-components';


import saga from './saga';
import reducer from './reducer';
import {
    loadUsers,
    addFilter,
    removeFilter
} from './actions';

import {
    makeSelectFilter,
    makeSelectUsers
} from './selectors';

import { USERS_PATH} from 'SiteData/constants';

//Now.. Also user cards lmao.
//Essentially Preview of profilel


const Wrapper = styled.div`


`;

//This is important 
class UsersPage extends Component{



    render(){

        return (<Wrapper>
            
            
        </Wrapper>)

    }


}


const mapStateToProps = createStructuredSelector({

    users: makeSelectUsers(),
    filter: makeSelectFilter(),

});

const mapDispatchToProps = dispatch => {

    return {

        loadUsers: () => {

            return dispatch(loadUsers());
        },

        onAddFilter: (filter) => {

            return dispatch(addFilter(filter));
        },

        onRemoveFilter: (filter) => {

            return dispatch(removeFilter(filter));
        }


    };

}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key: USERS_PATH, reducer});
const withSaga = injectSaga({key: USERS_PATH, saga});

export default compose(

    withConnect,
    withReducer,
    withSaga

)(UsersPage);