import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {StyledInput, StyledButton,} from 'components/StyledForm'


const LoginWrapper = styled.div`

    margin-top:5%;
    padding-bottom:5%;
    display:grid;
    grid-template-columns:auto;
    grid-template-rows: 1fr auto;
    justify-content:center;
`   


const LoginInput = styled(StyledInput)`


`;

const MainContent = styled.form`


    display:grid;
    grid-template-columns:1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr auto;
    place-items:center;
    grid-template-areas:
    "emailGroup emailGroup"
    "passwordGroup passwordGroup"
    "options options"
    "error error";

`

const AlternativeOptions = styled.div`

`


export{
    
    LoginWrapper,
    MainContent,
    AlternativeOptions,
    LoginInput,

}