import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import Tags from 'components/Tags';
import {UserLink} from 'components/General';
import media from 'theme/media';
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
    grid-column-gap: 10px;
    grid-template-columns: 30% 60%; 
    grid-template-rows: auto auto auto;

    grid-template-areas:
    "thumbnail header"
    "thumbnail description"
    "thumbnail footer";

  
    &:hover{
        background-color:rgba(2, 28, 73,0.5);
    }


    ${media.tablet`

        width:90%;
        margin:auto;
        grid-template-columns: 1fr auto;
        grid-template-rows: auto auto auto auto;

        grid-template-areas:
        "thumbnail thumbnail"
        "header header"
        "description description"
        "footer footer";

    `}
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



    ${media.tablet`

    height:300px;

`}

${media.phone`

    height:200px;
`}
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

    ${media.tablet`

        font-size:2em;
    `}
    ${media.phone`

        font-size:1em;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto auto;
        grid-template-areas:
        "title title"
        "author author
        "uploadDate uploadDate";
    `}
`;

const Title = styled(Clickable)`

    grid-area:title;
    font-weight: bold;
    color:white;
    cursor:pointer;

    &:hover{

        color: rgb(254, 161, 0);

    }

`;

const Author = styled.p`

    grid-area:author;
   
`;


const UploadDate = styled.div`

    grid-area:uploadDate;
    align-self:center;
    justify-self:end;
`;

//Prob just first paragraph / sentence of news post.
//That will be done via form submission of adding new posts.
const Description = styled.p`

    grid-area:description;
    place-self:start;
    ${media.tablet`

        font-size:2em;
    `}
    ${media.phone`

        font-size:1em;
    `}
`;



const Footer = styled.div`

    
    display:grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto;
    grid-template-areas:
    "tags button";
    align-items:center;
    
    ${media.tablet`

        text-align:right;        
        grid-template-columns: 100%;
        grid-template-areas:
        "tags"
        "button";
    `}

`;



const Button = styled(Clickable)`

    grid-area:button;
   
    background-image:url(${props => props.image});
    background-size: 100% 100%;
    background-position:center;
    background-repeat:no-repeat;
   
    place-self:end;

    ${media.tablet`

        font-size:2em;
        place-self:center;

    `}
    ${media.phone`

        font-size:1em;

    `}
`;


//Essentially taking place of NewsPost.
const NewsCard = props => {



    const {postUid,thumbnail,topic,author, postDate, content,tags, onCardClicked, onTagClicked} = props;
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
                <Button style = {{gridArea:"button"}} onClick = { () => {onCardClicked(postUid)}} > See More </Button> 
            </Footer>

        </Wrapper>
    )
    
}

export default NewsCard;