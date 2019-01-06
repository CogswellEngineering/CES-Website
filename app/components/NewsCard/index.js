import React from 'react';
import styled from 'styled-components';

//Aight, Ima just copy common news card layouts 
//seen in league, overwatch, runescape.
//I also want to do better than than that.. Fuck it that can be done later/

//Make it fucking viewable lmao.

const Wrapper = styled.div`

    border:2px solid black;
    width:100%;
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

    &:hover{

        background-color:red;
    }
`;  

const Thumbnail = styled.div`

    grid-area: thumbnail;

    background-image: url(${props => props.image});
    background-size: cover;
    background-position:center;
`;

//Will include title and author
const Header = styled.div`

    grid-area:header;

`;

const Title = styled.p`

    
`;

const Author = styled.div`

    display:inline-block;
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
    return (
        <Wrapper onClick = {onCardClick}>


            <Thumbnail image = {thumbnail} />
            <Header>

                <Title> {topic} </Title>
                <div style={{fontStyle:"italic"}}> by <Author> {author.name} </Author> {postDate || ""} </div>

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