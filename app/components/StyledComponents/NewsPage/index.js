import styled from 'styled-components';
import Modal from 'react-responsive-modal';

//Honestly most will also have mainContentWrapper on them, but also specific ones.
//I don't want it to be empty like that at start
const BlogPageWrapper = styled.div`



    display:grid;
    margin-top:5%;
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr;
    grid-template-areas:
    "blogs"
    "loadMore";


`;



///Panel of all the posts
const BlogsPanel = styled.div`

    grid-area:blogs;
    width:80%;
    margin:auto;
   

`;


const LoadMoreButton = styled.div`

    grid-area:"loadMore";
    color:rgb(227, 141, 1);
    background-color: black;
    text-transform: uppercase;
    cursor:pointer;
    padding:5px;
    align-self:center;
    justify-self:center;
`;

export{

    BlogPageWrapper,
    BlogsPanel,
    LoadMoreButton,
};