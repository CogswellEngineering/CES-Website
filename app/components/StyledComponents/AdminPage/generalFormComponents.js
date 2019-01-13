import styled from 'styled-components';

import Textarea from 'react-textarea-autosize';



export const ThumbnailDropzone = styled.div`


    border:2px dashed black;
    width:100%;
    height:200px;
    grid-area:thumbnail;
    text-align:center;
    margin-top:1%;


`;

export const Title = styled.p`

    text-align:center;
    font-size:2em;

`;
export const Label = styled.label`

    color: red;

`;

export const Field = styled.input`

    border:1px solid black;

`;

export const ContentField = styled(Textarea)`

    border:2px solid black;
    width:100%;
    resize: none;

`;

//For submitting
export const Button = styled.button`

    width:auto;
    text-align:center;
    cursor:pointer;
    margin: auto ;
    border:2px solid black;
`;
