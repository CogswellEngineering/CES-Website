import React, {Component} from 'react';
import styled from 'styled-components';
import {ContentField} from 'components/StyledForm';
import {Button} from 'components/General';

const Wrapper = styled.form`


    display:grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
    "poster comment"
    "poster options";
    grid-column-gap:1%;
`;

const Poster = styled.div`

    background-image:url(${props => props.profilePicture});
    background-size: 100% 100%;
    background-position:center;
    background-repeat:no-repeat;
    border:1px solid black;
    border-radius:25px;
    width:50px;
    height:50px;
`;



export default class PostComment extends Component{


    constructor(props){

        super(props);

        this.state = {

            comment: "",
        };

        this.onUpdateComment = this.onUpdateComment.bind(this);
        this.onPostComment = this.onPostComment.bind(this);
    }

    resetState(){

        this.setState({
            comment: "",
        });
    }
    

    componentWillUnmount(){

        this.resetState();
    }
    

    onUpdateComment(evt){

        this.setState({

            comment: evt.target.value
        });
    }

    onPostComment(evt){

        evt.preventDefault();
        this.props.onPost(this.state.comment);
        this.resetState();
    }


    render(){

        const {loggedInProfile} = this.props;
        
        return (
            <Wrapper style = {this.props.style} onSubmit = {this.onPostComment} id = "postComment">
            <Poster profilePicture = {loggedInProfile.profilePicture.url}/>
            <ContentField placeholder = "Type your comment here" 
            form = "postComment"
            //This works like expected except gotta click button twice.
            minRows = {1}
            onChange = {this.onUpdateComment} 
            value = {this.state.comment}
           // onFocus = {() => {this.onFocusUpdated(true);}}
           // onBlur = {() => {this.onFocusUpdated(false);}}
            style = {{gridArea:"comment"}}/>
            <div style = {{gridArea:"options", justifySelf:"end", alignSelf:"start"}}>
            {<Button type = "submit" style = {{padding:"5px", marginTop:"5px"}} > Post </Button>}
            </div>
            </Wrapper>
        )

    }


}