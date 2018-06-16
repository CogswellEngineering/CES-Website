import React from 'react'
import PropTypes from 'prop-types';
import {fieldChanged} from 'containers/App/actions';
import StyledForm, {StyledButton,StyledLabel,ErrorMessage,StyledInput} from 'components/StyledForm'
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withFirebase } from 'react-redux-firebase'
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import FormSelectors from 'utils/genericFormSelectors';
import { ACCOUNT_RECOVERY_PATH } from 'components/Header/pages';
import { attemptRecover } from './actions';
import saga from './saga';
import injectSaga from 'utils/injectSaga';

const AccountRecovery = (props) => {

   
    if (!props.linkSent){

        return (
            <div>
                
                <StyledForm onSubmit = {(evt) => {props.attemptRecover(evt,props.email);}
                    }>
                    <p> Enter your email and we will send you a recovery link </p>
                    <StyledLabel htmlFor="email"> Email </StyledLabel>
                    <StyledInput type="email" id = "email" name ="email" value={props.email} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                    <ErrorMessage> {props.error} </ErrorMessage>
                    <StyledButton type="submit"> Send Recovery Link </StyledButton> 
                </StyledForm>
            </div>
        )
    }
    else{
        return (
            <div>
                <h2> An email with further instructions has been sent to {props.email}. </h2>
                <p> If you do not see it, please check your ice box at <i>ice.cogswell.edu</i>. Then right click it it and 
                click accept from address to recieve all of our emails directly.</p>
            </div>
        )
    }
}


AccountRecovery.propTypes = {
    email : PropTypes.string.isRequired,
}

const formSelector = new FormSelectors(ACCOUNT_RECOVERY_PATH);

const mapStateToProps = createStructuredSelector({

    email: formSelector.makeSelectField("email"),
    linkSent: formSelector.makeSelectField("linkSent"),
});


function mapDispatchToProps(dispatch){
    return {

        fieldChanged : (evt) => {
            const target = evt.target;
            if (evt && evt.preventDefault) evt.preventDefault();
           return dispatch(fieldChanged(target.name,target.value))

        },

        attemptRecover : (evt,email) => {
            
            if (evt && evt.preventDefault) evt.preventDefault();

            const formData = new FormData();
            formData.append("email",email);

            return dispatch(attemptRecover(formData));

        }
    };
}

console.log("Reducer",reducer);
const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withReducer = injectReducer({key:ACCOUNT_RECOVERY_PATH,reducer});
const withSaga = injectSaga({key:ACCOUNT_RECOVERY_PATH,saga});

export default compose(
  withConnect,
  withFirebase,
  withReducer,
  withSaga,
)(AccountRecovery);
