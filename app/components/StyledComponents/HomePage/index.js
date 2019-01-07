import styled from 'styled-components';


const Wrapper = styled.div`

    width:90%;
    margin:auto;
    margin-top: 5%;


`;


const Picture = styled.div`

    grid-area:picture;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

    border:2px solid black;
`;

const Title = styled.div`
  
    text-transform:uppercase;
    text-decoration: underline;
    text-align:center;
    color: rgb(254, 161, 0);

`;

const SubTitle = styled.div`

    grid-area:subtitle;
`;

const Description = styled.div`

    grid-area:description;
    color:white;
`;

//This will have to be updated every time officer core changes.
const WhoWeAre = styled.div`


    text-align:center;
    margin:auto;

    ${Description}{

        width:30%;
        margin:auto;
    }
    
`;

const WhatWeDo = styled.div`

    margin: 0 auto;
    width:60%;
    margin-top:5%;


    
    //Inverse this for next ones.
    & > div{

        display:grid;
        grid-template-columns: 0.6fr 1fr;
        grid-column-gap: 1%;
        grid-template-rows: 30% auto;
        grid-template-areas:
        "picture subtitle"
        "picture description";

        
    }

    & > ${Title}{

        display:block;
       
    }
`;

const HelpStudentsBlock = styled.div`

    display:grid;
    grid-template-columns: 0.6fr 1fr;
    grid-column-gap: 1%;
    grid-template-rows: 30% auto;
    grid-template-areas:
    "picture subtitle"
    "picture description";
`;

const HostEventsBlock = styled.div`

    display:grid;

`;


const OtherServicesBlock = styled.div`



`;



const JoinUs = styled.div`

    margin-top:5%;

`;

export {

    WhoWeAre, WhatWeDo, JoinUs, Title, SubTitle, Description,Picture
};


export default Wrapper;