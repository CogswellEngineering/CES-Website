import React, { Component} from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Link,Route} from 'react-router-dom';
import {fieldChanged} from 'containers/App/actions';
import StyledForm, { FormGroup,StyledButton,StyledLabel,ErrorMessage,StyledInput} from 'components/StyledForm'
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withFirebase } from 'react-redux-firebase'
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import FormSelectors from 'utils/genericFormSelectors';
import { ACCOUNT_RECOVERY_PATH, REGISTER_PATH, LOGIN_PATH } from 'components/Header/pages';



//Welp, bout an hour or 2 of 'wasted' time. This revelation is something I should've thought bout before
//wasting time, but I learned stuff and know now to think. It makes sense it reroutes to it's own loginpage
//because multiple services uses same one. That's key.


const LoginWrapper = styled.div`

    width:50%;
    margin:auto;
    margin-top:5%;
    padding-bottom:20%;
    border:2px solid black;

`

const LoginButton = styled.button`

    margin-left:1%;

`

const StyledLink = styled(Link)`

    text-decoration:none;

`;

const MainContent = styled.form`

    width:100%;
    margin-left:30%;
    margin-top:5%;

`

const AlternativeOptions = styled.div`
    margin-left:30%;
    width:100%;
`




class LoginPage extends Component { 
    
    
    



    componentDidUpdate(){
        if (this.props.doneLoggingIn){
            //For now just go back, then I'll redirect as neccessarry coming from other places
            //Whether I'll set up the back like did in previous is another story, I should, reason is if redirected to here from printing page.
            console.log("I happen");    
            this.props.history.push("/");   
        }
    }
    render(){
        const props = this.props;
        return (
            <LoginWrapper>
                
                <MainContent onSubmit = {(evt) => {evt.preventDefault();
                    props.firebase.login({email:props.email,password:props.password})}
                    }>

                    <FormGroup>
                    <StyledLabel htmlFor="email"> Email </StyledLabel>
                    <StyledInput autoFocus type="email" id = "email" name ="email" value={props.email} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                    </FormGroup>

                    <FormGroup>
                    <StyledLabel htmlFor="password"> Password </StyledLabel>
                    <StyledInput type="password" id="password" name="password" value={props.password} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                    </FormGroup>

                    <StyledButton type="submit"> Login </StyledButton> 
                    
                 

                    <ErrorMessage> {props.error} </ErrorMessage>
                    
                </MainContent>
    
                <AlternativeOptions>
                    <StyledLink to = {ACCOUNT_RECOVERY_PATH}> Forgot Password? </StyledLink> 
                    <p>Don't have an account? <StyledLink to = {REGISTER_PATH}> Join here </StyledLink> </p>
                </AlternativeOptions>
    
            </LoginWrapper>
        )
    }
}


//Not really needed for pages like this, more fitting for components / visual stuff than containers, since these aren't passed in
//on creation
LoginPage.propTypes = {
    email : PropTypes.string,
    password: PropTypes.string,
    error: PropTypes.string,
    doneLoggingIn : PropTypes.bool,
}

const formSelector = new FormSelectors(LOGIN_PATH);

const mapStateToProps = createStructuredSelector({

    email: formSelector.makeSelectField("email"),
    password : formSelector.makeSelectField("password"),
    doneLoggingIn : formSelector.makeSelectDone("doneLoggingIn"),
    error : formSelector.makeSelectError()

});


function mapDispatchToProps(dispatch){
    return {

        fieldChanged : (evt) => {
            const target = evt.target;
            if (evt && evt.preventDefault) evt.preventDefault();
          
           return dispatch(fieldChanged(LOGIN_PATH,target.name,target.value))

        },

        onSubmit : (evt) => {
            const target = evt.target;

        }
    };
}

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withReducer = injectReducer({key:LOGIN_PATH,reducer});


export default compose(
  withConnect,
  withFirebase,
  withReducer
)(LoginPage);
