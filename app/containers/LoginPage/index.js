import React, {Component} from 'react'
import {Input,FormText,Form,FormGroup,Label,Button,Alert} from 'reactstrap';
import fire from './back-end/fire';
import {Link,Route} from 'react-router-dom';
import key from './util/keyIterator';



class Login extends Component{

    constructor(props){
        super(props);
        this.state = {

            email:"",
            password:"",
            error:"",
            requireVerification:false
            //Either state change and render different based on check or new page
            //for nor will jsut do check, not much more processing to check, though will check everytime re-render which is waste
            //hmmmmm.
        }
        this.attemptLogin = this.attemptLogin.bind(this);        
        this.fieldChanged = this.fieldChanged.bind(this);
        this.sendVerification = this.sendVerification.bind(this);
    }

    //Since literally same thing as register, will prob move this to it's own method, extra overhead but reduce dupe code.
    //For now it's fine.
    shouldComponentUpdate(newProps, newState){
        
        if (newProps.userInfo != this.props.userInfo){
            window.location.reload();
            return true;
        }

        const keys = Object.keys(newState);

        for (var i = 0;  i < keys.length; ++i){
            if (key(newState,i) != key(this.state,i)){
                return true;
            }
        }

        return false;
    }
    
    attemptLogin(event){

        event.preventDefault();
        //The and is incase verify though other window.
        
       
        this.validateLogin();
    }

    sendVerification(event){
        event.preventDefault();

        const user = fire.auth().currentUser;
        
        //Will change this to client url and change url to back-end url.
        const verificationOptions = {url:"http://localhost:3000/Login"}
        user.sendEmailVerification(verificationOptions)
            .then(val => {
                this.setState({
                    error:"",
                    requireVerification:false
                })
            })
    }
    
    validateLogin = async() =>{

        const auth = fire.auth();

        auth.signInWithEmailAndPassword(this.state.email,this.state.password)

            .then(res => {
                
                const user = auth.currentUser;

                if (!user.emailVerified){
                    //If not verified then don't allow login yet, tell thme to check email and provide button to click again.

                    this.setState({
                        error:"This account is not verified. Please check your email and click on the verification link.",
                        requireVerification:true
                    });
                    return;
                }
                const userInfoRef  = fire.database().ref("Users/"+user.uid);
               
                //Gets profile informaiton of user.
                userInfoRef.once('value').then(snapshot=>{
                    var userInfo = snapshot.val();
                    userInfo["uid"] = user.uid;
                    this.props.changeLogin(userInfo);  
                   
                    this.setState({
                        error:"",
                        requireVerification:false
                    });

                    const history = this.props.history;
                    if (this.props.location.state == null){

                        //Using redirect to avoid going back to register, but it does show it for a split second
                        //I probably should find way to check it here and avoid going there at all.
                        history.push("/");
                    }
                    else{
                        //This is when was forced to login when tried to go to a login required page.
                        history.push(this.props.location.state.back);
                    }
    
                })
               
            })

            .catch(err => {
                
                console.log(err);
                this.setState({
                    error:"Failed to login. Incorret email or password",
                    email:"",
                    password:""
                });
            }
            )

    }

    fieldChanged(event){
        const target = event.target;

        //Is it because set state from another render??????
        //wtf. It's not rendering
        this.setState({
            [target.name] : target.value,
            error:""
        });
        
    }

    render(){
      
        return (
            <div>
            <Form>
                <FormText color="warning" hidden = {this.props.location.state == null}> Please login to {(this.props.location.state != null)? this.props.location.state.prompt:""} </FormText>
                <FormGroup>
                    <Label for="emailInput">Email </Label> <FormText className="FormPrompt"> (Must be a cogswell student) </FormText>
                    <Input name="email" type="email" id="emailInput" value={this.state.email} onChange={this.fieldChanged}/>
                </FormGroup>
                <FormGroup>
                    <Label for="passwordInput">Password</Label> 
                    <Input name="password" type="password" id="passwordInput" value={this.state.password} onChange={this.fieldChanged}/>
                </FormGroup>
                {/*Given how many of these have error part could make it so not duplicating this line, but that's code polish*/}
                <Alert color="danger" isOpen={this.state.error !== ""}> {this.state.error} </Alert>
                {/*Could definietly make this better than it is, prob not good to send back to that page, prob better
                to just have another onclick that sends it again but don't want to duplicate code, I could jsut move the actual sending
                to a method though. Fine for now*/}
                <Button style={{display:"block",marginBottom:"1em"}} onClick={this.sendVerification} hidden = {!this.state.requireVerification}> Click here to send re-send the link </Button>
                <Button onClick = {this.attemptLogin} > Login </Button> <Button tag={Link} to="/ForgotPassword"> Forgot Password? </Button>
               
            </Form>
            </div>

            )
    }
}

export default Login;