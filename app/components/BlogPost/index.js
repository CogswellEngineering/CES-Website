import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TagsInput from 'react-tagsinput';


//Need to make this preview with read more that will go to page dedicated to this.

//Like use profile prob move this into corresponding folder in components, but here for quick tseting.
const BlogPostWrapper = styled.div`

    border-bottom: 1px solid black;
    margin-top:1%;
    color: rgb(254, 161, 0);

    

`;

const Header = styled.div`

    border-bottom: 2px solid black;
`

const Topic = styled.p`


    display:inline;
    
`;

const Author = styled.p`

    display:inline;
`;

const Body = styled.p`


`;


const TagsHeader = styled.p`

    display:inline;

`
const TagList = styled.ul`

    list-decoration:none;
    border:2px solid black;
    
`;

const Tag = styled.li`

    display:inline-block;
    width:20%;
    border:1px solid black;
    background-color:green;
    margin-right:2%;
    text-align:center;

`;


//infact this whole thing should be a component actually.

const BlogPost = (props) => {

    //Change all dscriptions to body, makes mroe sense.
    const {topic,body,author,tags} = props;

    console.log("tags",tags);

    return (
    
        <BlogPostWrapper>

            <Header>
                <Topic> {topic} </Topic>

                <Author> by <Link to ={"/account/"+author.uid} > {author.name} </Link> </Author>

                {
                    tags != null? 

                    <TagList>  
                         {tags.map( tag => {
                             return <Tag> {tag} </Tag>
                         })}
                    </TagList>
                :null
                }
            </Header>

            {/* This is actually fairly limited as they cannot embed links. I would have to provide tools there as well. Potentially that is fine though.
            */}
            <Body > {body} </Body>

        </BlogPostWrapper>
    )

}

BlogPost.propTypes={

    topic:PropTypes.string.isRequired,
    body:PropTypes.string.isRequired,
    author:PropTypes.object.isRequired,
}

export default BlogPost;