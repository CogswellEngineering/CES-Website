import React, {Component} from 'react';
import styled from 'styled-components';
import {ContentField, StyledLink} from 'components/StyledForm';
import {Button} from 'components/General';
import {LOGIN_PATH} from 'SiteData/constants';
import media from 'theme/media';
import {isMobileOnly } from 'react-device-detect';
const Wrapper = styled.div`


    display:grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
    "poster comment"
    "poster options";
    grid-column-gap:10px;

    
`;

const Poster = styled.div`

    background-image:url(${props => props.profilePicture});
    background-size: 100% 100%;
    background-position:center;
    background-repeat:no-repeat;
    border:1px solid black;
    border-radius:100px;
    border-radius:25px;

    
    width:50px;
    height:50px;
    ${media.tablet`

        width:100px;
        height:100px;
    `}

    ${media.phone`

        width:50px;
        height:50px;
    `}
`;

const Options = styled.div`

    grid-area:options;
    justify-self:end;
    button{

        margin-left:10px;
    }

`;



export default class PostComment extends Component{


    constructor(props){

        super(props);

        this.state = {

            comment: "",
        };


        this.minRows = 5;
        if (isMobileOnly){

            this.minRows = 3;
        }

        this.onUpdateComment = this.onUpdateComment.bind(this);
        this.onPostComment = this.onPostComment.bind(this);
        this.resetState = this.resetState.bind(this);
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
        console.log("comment", this.state.comment);
        return (
            loggedInProfile?

            <Wrapper style = {this.props.style}  id = "postComment">
            <Poster profilePicture = {loggedInProfile.profilePicture.url}/>
            <ContentField placeholder = "Type your comment here" 
            form = "postComment"
            //This works like expected except gotta click button twice.
            minRows = {this.minRows}
            onChange = {this.onUpdateComment} 
            value = {this.state.comment}
            style = {{gridArea:"comment"}}/>
            <Options>
            <Button onClick = {this.resetState}> Cancel </Button>
            <Button onClick = {this.onPostComment} style = {{padding:"5px", marginTop:"5px"}} > Post </Button>
            </Options>
            </Wrapper>
            :
            //Alot of hard literalling the strings recently, they exist, I should use.
            <p> You must be logged in to comment. <StyledLink to = {LOGIN_PATH}> Login </StyledLink> </p>
        )

    }


}