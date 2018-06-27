import React, { Component} from 'react';
import styled from 'styled-components';
import { Link }  from 'react-router-dom';
import { withFirebase} from 'react-redux-firebase';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from './saga';
import reducer from './reducer';
import { newPageClicked, newTabClicked, foundOwnerStatus, libraryUpdated, borrowedUpdated, ordersUpdated } from './actions'
import { makeSelectCollection, makeSelectCurrent } from './selectors';
import { createStructuredSelector } from 'reselect';
import { USER_INVENTORY_PATH, LOGIN_PATH } from 'components/Header/pages';
import { makeSelectLoggedInProfile } from 'containers/App/selectors';
import  Pagination from 'react-js-pagination';
//Using react-tabs-redux instead
//import { Tab, Tabs, TabList, TabPanel,  } from 'react-tabs';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
//Should I even bother with this?
import { BorrowedItem, LibraryItem, PurchaseItem } from 'components/InventoryItems';




const InventoryWrapper = styled.div`



`;

const ItemWrapper = styled.span`



`





class UserInventoryPage extends Component{


    constructor(props){


        super(props);


        this.eventSubscriptions = [];

    }


    componentDidMount(){

        const fireStore = this.props.firestore();

        const currUser = this.props.firebase.auth().currentUser;
        
        if (currUser == null){

            //Should go to not access
            this.props.history.push(LOGIN_PATH);
        }
        const invColRef = fireStore.collection("users").doc(currUser.uid).collection("inventory");
        //Move this to inventory window, might just keep a snap shot of stuff here, instead of full thing.
        const { onUpdateLibrary, onUpdateBorrowed, onUpdateOrders } = this.props;

        for (const unsubscribe in this.eventSubscriptions ){
           
            if (unsubscribe){

                unsubscribe();
            }
        }

        this.eventSubscriptions.clear();

        this.eventSubscriptions.push(invColRef.doc("library").onSnapShot(snapshot => {
            
            if (snapshot.exists){

                const content = snapshot.get("content/"+viewership);
                onUpdateLibrary(content);
            }

        }));

        this.eventSubscriptions.push(invColRef.doc("purchases").onSnapShot(snapshot => {
            
            if (snapshot.exists){

                const content = snapshot.get("content/"+viewership);
                onUpdatePurchases(content);
            }

        }));

        this.eventSubscriptions.push(invColRef.doc("borrowed").onSnapShot(snapshot => {
            
            if (snapshot.exists){

                const content = snapshot.get("content/"+viewership);
                onUpdateBorrowed(content);
            }

        }));

    }

    componentWillUnmount(){

        for (const unsubscribe in this.eventSubscriptions ){
           
            if (unsubscribe){
                unsubscribe();
            }
        }
    }

    componentDidUpdate(){

        console.log("Props",this.props);


        if (!this.props.firebase.auth().currentUser){

            this.props.history.push(LOGIN_PATH);
        }
    }


    render(){

      

        return ( <InventoryWrapper>
            
         


            </InventoryWrapper>
            

        );

    }
}

const mapStateToProps = createStructuredSelector({

    currentTab: makeSelectCurrent("currentTab"),
    currentPage: makeSelectCurrent("currentPage"),
    loggedInUserProfile: makeSelectLoggedInProfile(),
    library: makeSelectCollection("library"),
    orders : makeSelectCollection("orders"),
    borrowed: makeSelectCollection("borrowed"),

});

function mapDispatchToProps(dispatch){

    return {

        newTabClicked : (tab) => {

            return dispatch(newTabClicked(tab));
        },
        newPageClicked : (page ) => {

            return dispatch(newPageClicked(page));
        },

        onUpdateLibrary : (library) => {
            console.log("updated lib",library);

            return dispatch(libraryUpdated(library));
        },
        onUpdateOrders : (orders) => {
            console.log("updated orders",orders);
            
            return dispatch(ordersUpdated(orders));
        },
        //Prob just putting borrowed in library, but that's easy change later.
        onUpdateBorrowed : (borrowed) => {
            console.log("updated borrowed", borrowed)            
            return dispatch(updatedBorrowed(borrowed));
        }
    }
}


const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withReducer = injectReducer({key:USER_INVENTORY_PATH,reducer});
//const withSaga = injectSaga({key:USER_PROFILE_PATH,saga})

export default compose(
    withConnect,
    withReducer,
    withFirebase,
  //  withSaga,
)(UserInventoryPage);
