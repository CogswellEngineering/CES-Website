import styled from 'styled-components';


export default styled.form`

    border: 2px solid black;

`;

export const FormGroup = styled.div`



`;

export const StyledButton = styled.button`

    border: 1px solid black;
    width:40%;
    font-size:1.2em;
    &:hover{

        background-color:#D9D7D6;
    }
`;



export const StyledLabel = styled.label`

    color:green;
    display:block;
    width:50%;


`;


export const ErrorMessage =  styled.p`

    color:red;
    text-weight:bold;

`;

export const StyledInput =  styled.input`

    width:100%;
    font-size:1.2em;
    border:1px solid black;
    font-family: sans-serif;
    font-size: 14px;
    line-height: 20px;
    &:focus{

        border:1px solid #c6e28d;
        box-shadow: 0 0 2px;
        outline:none;

    }
    

`;

export const StyledSelect = styled.select`



`
export const StyledOption = styled.option`

    
`