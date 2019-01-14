import React from 'react';
import styled from 'styled-components';

const TagsWrapper = styled.div`

    display:flex;
    flex-direction:row;
    flex-wrap: wrap;
`;

//I want to limit flex per column better.
export const Tag = styled.div`


    text-align:center;

    background-color: ${props => props.color};
    border-style:double;
    color:rgb(254, 161, 0);
    border-radius:25px;
    height:60px;
    padding-right:5px;
    padding-left:5px;
    min-width:100px;
    margin-right:10px;
    margin-top:10px;
    display:grid;

    cursor: ${props => props.clickable? "pointer" : ""};
    
`;

const Tags = (props) => {

    console.log ("tag props", props);
    return (<TagsWrapper style = {props.style}>

        {props.tags && props.tags.map( tag => {

        
            var color = "black";
          
            return <Tag key = {tag.title} clickable = {props.onTagClicked != null} color = {color} onClick = {() => {props.onTagClicked(tag)}}> 

                <p style = {{placeSelf:"center"}}>{tag.title}</p>
             </Tag>;

        })}

    </TagsWrapper>)

}


export default Tags;




