import React, {Component} from 'react'
import { Link } from 'react-router-dom';
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
import { RESET_PASSWORD_PATH, LOGIN_PATH } from 'components/Header/pages';
import { checkToken, resetTokenUsed, changePassword } from './actions';
import saga from './saga';
import injectSaga from 'utils/injectSaga';
import queryString from 'query-string';


class ResetPasswordPage extends Component{
    
    componentWillMount(){

        const params = queryString.parse(this.props.location.search);
        const token = params.token;

        if (token != null){
            //This will call the dispatch to mark this token as expired, so that link will no longer work.
            this.props.checkToken(token);
        }
    }
    
    render(){



        const props = this.props;

        if (!props.tokenChecked){
    
            //Later will be loading page.
            return null;
        }
        else if (props.tokenExpired){
            return (
                <div>
                    <h2> This token has expired and / or has already been used </h2>
                </div>
            )
        }
        else if (!props.passwordChanged){

            return (
                <div>
                    
                    <StyledForm onSubmit = {(evt) => {props.newPassword(evt,props.password,props.token);}
                        }>
                        <p> Enter your new password </p>
                        <StyledLabel htmlFor="password"> Email </StyledLabel>
                        <StyledInput type="password" id = "password" name ="password" value={props.password} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                        <StyledLabel htmlFor="retypedPassword"> Email </StyledLabel>
                        <StyledInput type="password" id = "retypedPassword" name ="retypedPassword" value={props.retypedPassword} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                        
                        
                        <ErrorMessage> {props.error} </ErrorMessage>
                        <StyledButton type="submit"> Change Password </StyledButton> 
                    </StyledForm>
                </div>
            )
        }
        else{
            return (
                <div>
                    <p> Your password has been changed. Try logging in <Link to={LOGIN_PATH}> here </Link>  </p>

                </div>
            )
        }
    }
}


AccountRecovery.propTypes = {
    tokenChecked: PropTypes.bool,
    tokenExpired: PropTypes.bool,
    passwordChanged: PropTypes.bool,
    password : PropTypes.string.isRequired,
    retypedPassword : PropTypes.string.isRequired,
    error: PropTypes.string,
}

const formSelector = new FormSelectors(RESET_PASSWORD_PATH);

const mapStateToProps = createStructuredSelector({

    tokenChecked: formSelector.makeSelectField("tokenChecked"),
    tokenExpired: formSeelector.makeSelectField("tokenExpired"),
    passwordChanged: formSelector.makeSelectField("passwordChanged"),
    password: formSelector.makeSelectField("password"),
    retypedPassword: formSelector.makeSelectField("retypedPassword"),
    error: formSelector.makeSelectField("error"),
});


function mapDispatchToProps(dispatch){
    return {

        checkToken: (token) => {
            
            return dispatch(checktoken(token));
        }

        tokenUsed : (token) => {

            return dispatch(resetTokenUsed(token));
        }

        fieldChanged : (evt) => {
            const target = evt.target;
            if (evt && evt.preventDefault) evt.preventDefault();
           return dispatch(fieldChanged(target.name,target.value))

        },

        newPassword : (evt,newPassword,token) => {
            
            if (evt && evt.preventDefault) evt.preventDefault();


            return dispatch(changePassword(newPassword,token));

        }
    };
}

console.log("Reducer",reducer);
const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withReducer = injectReducer({key:RESET_PASSWORD_PATH,reducer});
const withSaga = injectSaga({key:RESET_PASSWORD_PATH,saga});

export default compose(
  withConnect,
  withFirebase,
  withReducer,
  withSaga,
)(AccountRecovery);
