import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { fieldChanged} from 'containers/App/actions';
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
import styled from 'styled-components';
import {Button} from 'components/General';


const Wrapper = styled.form`

    margin:auto;
    margin-top:5%;
    text-align:center;

`;


class AccountRecovery extends Component{
  
    
   
    constructor(props){

        super(props);

        this.state = {

            email:"",
        }
    
        this.onEmailChanged = this.onEmailChanged.bind(this);
    }

    onEmailChanged(evt){

        this.setState({

            email: evt.target.value,
        });
    }

  
   
    render() {
        const props = this.props;
   
        if (!props.linkSent){

            return (
                <Wrapper onSubmit = {(evt) => {props.attemptRecover(evt,this.state.email);}}>
                    
                        <p> Enter your email and we will send you a recovery link </p>
                        <StyledLabel htmlFor="email" style = {{display:"inline-block", paddingRight:"5px"}}> Email </StyledLabel>
                        <StyledInput type="email" id = "email" name ="email" value={this.state.email} onChange={this.onEmailChanged}/>
                        <ErrorMessage> {props.error} </ErrorMessage>
                        <Button type="submit" > Send Recovery Link </Button> 
                </Wrapper>
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
}




const formSelector = new FormSelectors(ACCOUNT_RECOVERY_PATH);

const mapStateToProps = createStructuredSelector({

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


            return dispatch(attemptRecover(email));

        }
    };
}

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withReducer = injectReducer({key:ACCOUNT_RECOVERY_PATH,reducer});
const withSaga = injectSaga({key:ACCOUNT_RECOVERY_PATH,saga});

export default compose(
  withConnect,
  withFirebase,
  withReducer,
  withSaga,
)(AccountRecovery);
