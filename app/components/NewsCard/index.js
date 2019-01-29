import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import Tags from 'components/Tags';
import {UserLink} from 'components/General';
import media from 'theme/media';
import {USER_PROFILE_PATH} from 'SiteData/constants';
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
    text-align: justify;
    text-justify: inter-word;
    grid-column-gap: 10px;
    grid-row-gap:10px;
    grid-template-columns: 30% 60%; 
    grid-template-rows: 100px 100px auto;

    grid-template-areas:
    "thumbnail header"
    "thumbnail description"
    "thumbnail footer";

  
  


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

    height:310px;

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

    ${media.tablet}
    ${media.phone`

        grid-template-columns: auto auto;
        grid-template-rows: auto auto auto;
        grid-template-areas:
        "title title"
        "author author
        "uploadDate uploadDate";
    `}
`;

export const Title = styled(Clickable)`

    grid-area:title;
    font-weight: bold;
    color:white;
    cursor:pointer;

    &:hover{

        color: rgb(254, 161, 0);

    }

    ${media.tablet}
    ${media.phone}

`;

export const Author = styled.p`

    grid-area:author;
    ${media.tablet}
    ${media.phone}
   
`;


export const UploadDate = styled.p`

    grid-area:uploadDate;
    align-self:center;
    justify-self:end;
    ${media.tablet}
    ${media.phone}
`;

//Prob just first paragraph / sentence of news post.
//That will be done via form submission of adding new posts.
const Description = styled.p`

    //I want to parse it to first sentence.
    grid-area:description;
    place-self:start;
    ${media.tablet}
    ${media.phone}
`;



const Footer = styled.div`

    
    display:grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto;
    grid-template-areas:
    "tags button";
    align-items:end;
    
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

        
        place-self:center;
    `}
    ${media.phone`


    `}
`;


//Essentially taking place of NewsPost.
const NewsCard = props => {



    const {postUid,thumbnail,topic,author, postDate, content,tags, onCardClicked, onTagClicked} = props;

    const profilePath = USER_PROFILE_PATH.split(":")[0];

    return (
        <Wrapper style = {props.style}>


            <Thumbnail image = {thumbnail}  onClick = { () => {onCardClicked(postUid)}} />
            <Header>

                <Title  onClick = { () => {onCardClicked(postUid)}}> {topic} </Title>
                  <Author> by <UserLink to = { profilePath + author.uid}>{author.name}</UserLink> </Author> <UploadDate>{ postDate && dateFns.format(postDate, "MMMM     DD YYYY")} </UploadDate> 

            </Header>

            <Description> {content} </Description>
            <Footer>
                <Tags style = {{gridArea:"tags"}} tags = {tags} onTagClicked = {onTagClicked} />
                <Button style = {{gridArea:"button"}} onClick = { () => {onCardClicked(postUid)}} > More </Button> 
            </Footer>

        </Wrapper>
    )
    
}

export default NewsCard;