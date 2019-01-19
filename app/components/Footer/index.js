import React from 'react';
import styled from 'styled-components';

const githubLogo = require("images/icons8-github-64.png");
const discordLogo = require("images/icons8-discord-48.png");


const Wrapper = styled.div`
    
    background-color: rgb(0, 24, 74);
    color: rgb(254, 161, 0);

    //I mean padding keeps it consistent.
    height:5em;
    display:grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas:
    "links";
  
`;


const Links = styled.div`

    grid-area:links;
    place-self:center;
    display:flex;
    width:20%;
    justify-content:space-evenly;
    margin:auto;
`;

const Link = styled.a`

   
    background-position: center;
    background-repeat: no-repeat;
    width: 2em;
    height: 2em;

`;

const Icon = styled.img`

    max-width:100%;
    max-height:100%;
`;


const Footer = props => {



    //This will have link to contact, repository.
    return (<Wrapper onClick = {props.onClick}>
        
        <Links>

            <Link href = "https://github.com/CogswellEngineering"> <Icon src ={githubLogo} /> </Link>
            <Link href = "https://discord.gg/9PrvySw"> <Icon src = {discordLogo}/> </Link>

        </Links>   
        
        </Wrapper>)

}

export default Footer;