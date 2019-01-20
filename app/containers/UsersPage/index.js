//Essentially display all users. Will have filter based on concentration.
import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {isBrowser} from 'react-device-detect';
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

import { USERS_PATH, USER_PROFILE_PATH} from 'SiteData/constants';
import UserCard from 'components/UserCard';
import Tags from 'components/Tags';

import media from 'theme/media';
import {SUBTITLE_COLOR} from 'theme/colors';
import { Headline, Subtitle} from 'components/General';
//Now.. Also user cards lmao.
//Essentially Preview of profilel


const Wrapper = styled.div`

    margin-top:5%;
    padding-bottom:5%;
    display:grid;
    place-items:center;

`;

const Header = styled.div`

    ${media.tablet};
    ${media.phone};

`;

const Filter = styled.div`

    padding-bottom:5%;
`;
const FilterHeader = styled.p`

    text-transform:uppercase;
    text-align:center;
    color: ${SUBTITLE_COLOR};
    ${media.tablet};
    ${media.phone};


`;

const UserList = styled.div`

    

    margin-top:5%;
    place-self:start;
    width:90%;
    display:grid;
    grid-row-gap:10px;


`;

//This is important 
class UsersPage extends Component{


    constructor(props){

        super(props);

        this.onUserClicked = this.onUserClicked.bind(this);

        //Regardless if mounted, loading all users, since maybe alot.
        this.props.loadUsers();
    }

    onUserClicked = (uid) => {

        const profilePath = USER_PROFILE_PATH.split(":")[0];

        this.props.history.push(profilePath + uid);
    }


    render(){

        const {users, filter, onAddFilter, onRemoveFilter} = this.props;
        return (<Wrapper>

             <Header>  

                <Headline> Club members </Headline>
                {isBrowser && <Subtitle> Find someone that you'd like to work with! </Subtitle>}

            </Header>

            { filter.size > 0 && <Filter>
                <FilterHeader> Showing users with concentrations </FilterHeader>            
                <Tags tags = {filter} onTagClicked = {onRemoveFilter}/>
            </Filter>
            }
            {filter.size > 0  && <div style = {{borderBottom:"1px solid black", width:"100%"}}/>}

            <UserList>
                {users && users.map(user => {

                    return <UserCard key = {user.uid} {...user} onClickConcentration = {onAddFilter} onClick = {this.onUserClicked} /> 
                })}

            </UserList>      
             
            
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