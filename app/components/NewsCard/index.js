import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
//Aight, Ima just copy common news card layouts 
//seen in league, overwatch, runescape.
//I also want to do better than than that.. Fuck it that can be done later/

//Make it fucking viewable lmao.

const Wrapper = styled.div`


    width:100%;
    height:240px;
    display:grid;
    
    grid-column-gap: 2%;
    grid-template-columns: 30% 60%; 
    grid-template-rows: 1fr 1fr 1fr 0.5fr;

    grid-template-areas:
    "thumbnail header"
    "thumbnail description"
    "thumbnail footer"
    "thumbnail . ";


    cursor:pointer;

   
`;  

const Thumbnail = styled.div`

    grid-area: thumbnail;

    background-image: url(${props => props.image});
    background-size: 80%;
    background-position:center;
    background-repeat: no-repeat;


    ${Wrapper}:hover & {
        background-size:contain;
    }  
`;

//Will include title and author
const Header = styled.div`

    grid-area:header;
    display:grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
    "title title"
    "author uploadDate";
`;

const Title = styled.p`

    grid-area:title;
    font-weight: bold;

`;

const Author = styled.div`

    grid-area:author;
`;

const UploadDate = styled.div`

    grid-area:uploadDate;
    align-self:start;
`;

const Description = styled.div`

    grid-area:description;
`;



const Footer = styled.div`

    display:flex;
    width:100%;
    flex-wrap: nowrap;
    justify-content:space-between;

`;

const Tags = styled.div`

    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items:space-evenly;
    flex:1;
    text-align:center;
`;

const Tag = styled.div`

    width:15%;
    box-sizing: border-box;
    border-radius:10px;
    color:white;
    align-self: center;
    background-color:black;
`;

const Button = styled.div`

    align-self:flex-end;
`;


//Essentially taking place of NewsPost.
const NewsCard = props => {



    const {thumbnail,topic,author, postDate, body,tags, onCardClick} = props;
    console.log("post date", postDate);
    return (
        <Wrapper onClick = {onCardClick} style = {props.style}>


            <Thumbnail image = {thumbnail} />
            <Header>

                <Title> {topic} </Title>
                  <Author> by <i>{author.name}</i> </Author> <UploadDate>{ postDate && dateFns.format(postDate.toDate(), "MMMM     DD YYYY")} </UploadDate> 

            </Header>

            <Description> {body} </Description>
            <Footer>
                <Tags>
                    {tags && tags.map( tag => {

                        return <Tag key = {tag}> {tag}</Tag>
                    })}
                </Tags>
                {/* Maybe instead of see more just make whole thing clickable liek overwatch instead of just thumbnail */}
            </Footer>

        </Wrapper>
    )
    
}

export default NewsCard;