import React, {Component} from 'react';
import styled from 'styled-components';
import {Label, Button} from 'components/StyledComponents/AdminPage/generalFormComponents';
import Textarea from 'react-textarea-autosize';


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

const CommentField = styled(Textarea)`

    grid-area:comment;
    border:1px solid black;
`;




export default class PostComment extends Component{


    constructor(props){

        super(props);

        this.state = {

            comment: "",
            minRows: 1,
        };

        this.onUpdateComment = this.onUpdateComment.bind(this);
        this.onPostComment = this.onPostComment.bind(this);
        this.onFocusUpdated = this.onFocusUpdated.bind(this);
    }

    resetState(){

        this.setState({
            comment: "",
            minRows:1
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

    onFocusUpdated(focused){


        const minRows = focused? 5 : 1;

        this.setState({

            minRows,
        });
    }

    render(){

        const {loggedInProfile} = this.props;
        
        return (
            <Wrapper style = {this.props.style} onSubmit = {this.onPostComment}>
            <Poster profilePicture = {loggedInProfile.profilePicture.url}/>
            <CommentField placeholder = "Type your comment here" 
            minRows = {this.state.minRows} 
            onChange = {this.onUpdateComment} 
            value = {this.state.comment}
            onFocus = {() => {this.onFocusUpdated(true);}}
            onBlur = {() => {this.onFocusUpdated(false);}}/>
            <div style = {{gridArea:"options", justifySelf:"end", alignSelf:"start"}}>
            <Button type = "submit" > Post </Button>
            </div>
            </Wrapper>
        )

    }


}