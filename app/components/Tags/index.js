import React from 'react';
import styled from 'styled-components';

const TagsWrapper = styled.div`

    display:flex;
    flex-direction:row;
    flex-wrap: wrap;

`;

//I want to limit flex per column better.
export const Tag = styled.p`


    align-self: flex-start;
    text-align:center;
    background-color: ${props => props.color};
    border-style:solid;
    color:rgb(254, 161, 0);
    border-radius:15px;
    padding-right:5px;
    padding-left:5px;
    min-width:80px;
    cursor: ${props => props.clickable? "pointer" : ""};
    flex-shrink:2;
    margin-right:1%;    
    &:hover{

        border-style:double;
    }
`;

const Tags = (props) => {

    console.log ("tag props", props);
    return (<TagsWrapper style = {props.style}>

        {props.tags && props.tags.map( tag => {

        
            var color = "black";
          
            return <Tag key = {tag.title} clickable = {props.onTagClicked != null} color = {color} onClick = {() => {props.onTagClicked(tag)}}> 

                {/*This should be an x instead */}
     {tag.title}
             </Tag>;

        })}

    </TagsWrapper>)

}


export default Tags;




