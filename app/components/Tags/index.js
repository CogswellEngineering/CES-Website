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
    border-color: ${props => props.color};
    border-radius: 25px;
    color:rgb(254, 161, 0);
    padding:5px;
    margin-right:10px;
    margin-bottom:5px;
    
`;

const Tags = (props) => {

    console.log ("tag props", props);
    return (<TagsWrapper style = {props.style}>

        {props.tags && props.tags.map( tag => {

        
            var color = "black";
           /* 
            Type no longer a thing. Hmm will maybe re-add for SEO.
            switch (tag.type){
                case "Language":
                    color = "red";
                break;

                case "Technology":
                    color = "blue";
                break;

                case "Context":
                    color = "green";
                break;
                
            }
*/
            return <Tag key = {tag.title} color = {color}> {tag.title} </Tag>;

        })}

    </TagsWrapper>)

}


export default Tags;




