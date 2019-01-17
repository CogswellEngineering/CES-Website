import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import Tags from 'components/Tags';
import {UserLink} from 'components/General';
const advanceIcon = require('images/icons8-advance-48.png');
//Aight, Ima just copy common news card layouts 
//seen in league, overwatch, runescape.
//I also want to do better than than that.. Fuck it that can be done later/

//Make it fucking viewable lmao.

const Wrapper = styled.div`


    width:100%;

    //I REALLY want it to be auto, but it doesn't look good if not uniform lol.
    height:auto;

    display:grid;
    grid-column-gap: 1%;
    grid-template-columns: 30% 60%; 
    grid-template-rows: auto auto auto;

    grid-template-areas:
    "thumbnail header"
    "thumbnail description"
    "thumbnail footer";

    &:hover{
        background-color:rgba(2, 28, 73,0.5);
    }
`;  


const Clickable = styled.p`

    cursor:pointer;
    color:white;
    &:hover{

        color: rgb(254, 161, 0);

    }
`;

const Thumbnail = styled.div`

    grid-area: thumbnail;

    background-image: url(${props => props.image});
    background-size: 100% 100%;
    background-position:center;
    background-repeat: no-repeat;
    cursor:pointer;
`;

//Will include title and author
const Header = styled.div`

    grid-area:header;
    display:grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto auto;
    grid-template-areas:
    "title title"
    "author uploadDate";
`;

const Title = styled(Clickable)`

    grid-area:title;
    font-weight: bold;
    font-size:1.5em;
    color:white;
    cursor:pointer;

    &:hover{

        color: rgb(254, 161, 0);

    }

`;

const Author = styled.div`

    grid-area:author;
`;


const UploadDate = styled.div`

    grid-area:uploadDate;
    align-self:start;
`;

//Prob just first paragraph / sentence of news post.
//That will be done via form submission of adding new posts.
const Description = styled.p`

    grid-area:description;
    place-self:start;
`;



const Footer = styled.div`

    
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
    "tags button";
    align-items:center;
    
`;



const Button = styled(Clickable)`

    grid-area:button;
    justify-self:end;
    align-self:end;
    background-image:url(${props => props.image});
    background-size: 100% 100%;
    background-position:center;
    background-repeat:no-repeat;
    width:48px;
    height:48px;
`;


//Essentially taking place of NewsPost.
const NewsCard = props => {



    const {postUid,thumbnail,topic,author, postDate, content,tags, onCardClicked, onTagClicked} = props;
    console.log("post date", postDate);
    return (
        <Wrapper style = {props.style}>


            <Thumbnail image = {thumbnail}  onClick = { () => {onCardClicked(postUid)}} />
            <Header>

                <Title  onClick = { () => {onCardClicked(postUid)}}> {topic} </Title>
                  <Author> by <UserLink to = {"/account/" + author.uid}>{author.name}</UserLink> </Author> <UploadDate>{ postDate && dateFns.format(postDate, "MMMM     DD YYYY")} </UploadDate> 

            </Header>

            <Description> {content} </Description>
            <Footer>
                <Tags style = {{gridArea:"tags"}} tags = {tags} onTagClicked = {onTagClicked} />
                <Button style = {{gridArea:"button"}} onClick = { () => {onCardClicked(postUid)}} image = {advanceIcon}/> 
            </Footer>

        </Wrapper>
    )
    
}

export default NewsCard;