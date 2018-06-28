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

    width:40%;
    font-size:1.2em;
    border:2px solid black;
    
    &:focus{

        border:2px solid #f4df42;
    }

`;

export const StyledSelect = styled.select`



`
export const StyledOption = styled.option`

    

`