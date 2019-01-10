import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    
    background-color: rgb(0, 24, 74);
    color: rgb(254, 161, 0);
    
    
   
`;



const Link = styled.div`

    align-self:flex-start;
`;

const Footer = props => {



    //This will have link to contact, repository.
    return (<Wrapper>
        
        <Link> Github </Link>      
        
        </Wrapper>)

}

export default Footer;