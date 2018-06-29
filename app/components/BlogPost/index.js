import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//Like use profile prob move this into corresponding folder in components, but here for quick tseting.
const BlogPostWrapper = styled.div`

    border: 2px solid black;

`;

const Topic = styled.p`

    display:inline;


`;

const Author = styled.p`

    display:inline;
`;

const Body = styled.p`


`;


//infact this whole thing should be a component actually.

const BlogPost = (props) => {

    //Change all dscriptions to body, makes mroe sense.
    const {topic,body,author} = props;

    console.log("Body after posting",body);

    return (
    
        <BlogPostWrapper>

            <Topic> {topic} </Topic>

            <Author> by <Link to ={"/account/"+author.uid} > {author.name} </Link> </Author>

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
