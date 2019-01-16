import React, {Component} from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import {Link} from 'react-router-dom';
import Textarea from 'react-textarea-autosize';

//Will move these to be own component later on.
const Wrapper = styled.div`


    
`;

const Comment = styled.div`

    color:white;
    display:grid;
    margin-top:5%;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto auto ;
    grid-template-areas:
    "icon author postDate"
    "icon content content"
    "icon content content";

    grid-column-gap:1%;
`;

//Could prob make this a generic user icon for posting.
const Icon = styled(Link)`

    grid-area:icon;
    background-image:url(${props => props.image});
    background-size: 100% 100%;
    background-position:center;
    background-repeat:no-repeat;
    border:1px solid black;
    border-radius:25px;
    width:50px;
    height:50px;
`;

const Author = styled(Link)`

    grid-area:author;
    font-style:italic;
    text-decoration:none;
    color:rgb(230, 151, 7);
`;

const Content = styled(Textarea)`

    resize:none;
    grid-area:content;
    

`;

const PostDate = styled.div`

    grid-area:postDate;

`;


class Comments extends React.PureComponent{


    render(){

        const {style, comments} = this.props;

        return (<Wrapper style={style}>
        
            {comments && comments.map(comment => {

                const {poster, postDate, content} = comment;
                console.log("icon", poster)
                const format = "MM/D/YYYY";
                console.log("comment content[",content,"]");
                return <Comment key = {poster.uid + postDate + content}>
                        <Icon image = {poster.icon} to = {"/account/"+poster.uid}/>
                        <Author to = {"/account/"+poster.uid}> {poster.name} </Author>
                        <PostDate> {dateFns.format(postDate,format)} </PostDate>

                        <Content disabled value=  {content}> </Content>    
                        
                        </Comment>
            })}
            
        
        
        </Wrapper>)

    }
}

export default Comments;