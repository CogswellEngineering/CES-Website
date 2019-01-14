import styled from 'styled-components';

export const Wrapper = styled.div`

    width:80%;
    margin:auto;
    margin-top:5%;

    display:grid;
    grid-column-gap:5%;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas:
    "form options"
    "form .";
`;


export const OptionsPanel = styled.div`


    grid-area: options;
    border-bottom: 0px;
`;

export const Option = styled.div`

    cursor:pointer;
    font-weight: ${props=> props.selected? "bold": ""};
    color: white;
    border-bottom:2px solid rgb(254, 160, 13);
    text-align:center;
    padding:5%;
    width:100%;
`;
