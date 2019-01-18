import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {fieldChanged} from 'containers/App/actions';
import StyledForm, {StyledButton,StyledLabel,ErrorMessage,StyledInput, StyledLink} from 'components/StyledForm'
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withFirebase } from 'react-redux-firebase'
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import FormSelectors from 'utils/genericFormSelectors';
import { RESET_PASSWORD_PATH, LOGIN_PATH } from 'SiteData/constants';
import { checkToken, resetTokenUsed, changePassword } from './actions';
import saga from './saga';
import injectSaga from 'utils/injectSaga';
import queryString from 'query-string';
import {Button} from 'components/General';
import styled from 'styled-components';


const Wrapper = styled.div`


    text-align:center;
`;

class ResetPasswordPage extends Component{
    
    constructor(props){
        super(props);
        this.token = "";

        this.state = {

            password:"",
            retypedPassword:"",
        };

        //Will do same update to this. in terms of styling
        //and removing stuff that don't need to be in reducer.
        this.onFieldChanged = this.onFieldChanged.bind(this);
    }

    componentDidMount(){

        //Ahhh this one.
        const params = queryString.parse(this.props.location.search);
        this.token = params.resetToken;

        if (this.token != null && !this.props.tokenChecked){
            this.props.checkToken(this.token);
        }
    }

    componentDidUpdate(){

        const props = this.props;
        if (props.tokenChecked && !props.tokenExpired){
            props.tokenUsed(this.token)
        }
    }

    onFieldChanged(evt){

        const target = evt.target;

        this.setState({

            [target.id] : target.value
        });
    }
    
    render(){


        const props = this.props;

        if (!props.tokenChecked){
    
            return null;
        }
        else if (props.tokenExpired){

            if (!props.expiredThisSession){

                return (
                    <Wrapper>
                        <h2> This token has expired and / or has already been used </h2>
                    </Wrapper>
                )
           }
        }
        else{

            
        
        }

        if (!props.passwordChanged){

            return (
                <Wrapper>
                    
                    <StyledForm onSubmit = {(evt) => { evt.preventDefault(); props.newPassword(evt,this.state.password,this.token);}
                        }>
                        <p> Enter your new password </p>
                        <StyledLabel htmlFor="password"> Password </StyledLabel>
                        <StyledInput type="password" id = "password"  value={this.state.password} onChange={this.onFieldChanged}/>
                        <StyledLabel htmlFor="retypedPassword"> Re-typed Password </StyledLabel>
                        <StyledInput type="password" id = "retypedPassword" value={this.state.retypedPassword} onChange={this.onFieldChanged}/>
                        <ErrorMessage> {props.error} </ErrorMessage>
                        <Button type="submit"> Change Password </Button> 
                    </StyledForm>
                </Wrapper>
            )
        }
        else{
            return (
                <Wrapper>
                    <p> Your password has been changed. Try logging in <StyledLink to={LOGIN_PATH}> here </StyledLink>  </p>

                </Wrapper>
            )
        }
    }
}


const formSelector = new FormSelectors(RESET_PASSWORD_PATH);

const mapStateToProps = createStructuredSelector({

    expiredThisSession: formSelector.makeSelectField("expiredThisSession"),
    tokenChecked: formSelector.makeSelectField("tokenChecked"),
    tokenExpired: formSelector.makeSelectField("tokenExpired"),
    passwordChanged: formSelector.makeSelectField("passwordChanged"),
    error: formSelector.makeSelectField("error"),
});


function mapDispatchToProps(dispatch){
    return {

        checkToken: (token) => {
            
            return dispatch(checkToken(token));
        },

        tokenUsed : (token) => {

            return dispatch(resetTokenUsed(token));
        },

        fieldChanged : (evt) => {
            const target = evt.target;
            if (evt && evt.preventDefault) evt.preventDefault();
           return dispatch(fieldChanged(target.name,target.value))

        },

        newPassword : (evt,newPassword,token) => {
            
            if (evt && evt.preventDefault) evt.preventDefault();

            const formData = new FormData();

            formData.append("token",token);
            formData.append("password",newPassword);

            return dispatch(changePassword(formData));

        },
    };
}

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withReducer = injectReducer({key:RESET_PASSWORD_PATH,reducer});
const withSaga = injectSaga({key:RESET_PASSWORD_PATH,saga});

export default compose(
  withConnect,
  withFirebase,
  withReducer,
  withSaga,
)(ResetPasswordPage);
