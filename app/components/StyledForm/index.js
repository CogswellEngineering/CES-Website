import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Textarea from 'react-textarea-autosize';
import media from 'theme/media';

export default styled.form`

    border: 2px solid black;

`;
export const ContentField = styled(Textarea)`

    width:100%;
    resize: none;
    border:1px solid black;
    font-family: sans-serif;
    line-height: 1.6em;
    &:focus{

        border:1px solid #c6e28d;
        box-shadow: 0 0 2px;
        outline:none;

    }

    ${media.tablet}
    ${media.phone}

`;
export const StyledLink = styled(Link)`

    text-decoration:none;
    color: rgb(222, 147, 9);
    cursor:pointer;
    ${media.tablet};
    ${media.phone}; 

`;

export const FormGroup = styled.div`



`;

export const StyledButton = styled.button`

    border: 1px solid black;
    ${media.tablet}
    ${media.phone}
    width:40%;
    &:hover{

        background-color:#D9D7D6;
    }
`;



export const StyledLabel = styled.label`

    color:green;
    display:block;
    ${media.tablet}
    ${media.phone}

`;


export const ErrorMessage =  styled.p`

    color:red;
    text-weight:bold;
    ${media.tablet}
    ${media.phone}
`;

export const StyledInput =  styled.input`

    border:1px solid black;
    font-family: sans-serif;
    line-height: 20px;
    
    &:focus{

        border:1px solid #c6e28d;
        box-shadow: 0 0 2px;
        outline:none;

    }

    ${media.tablet}
    ${media.phone}
`;

export const StyledSelect = styled.select`



`
export const StyledOption = styled.option`

    
`