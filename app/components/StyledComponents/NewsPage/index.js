import styled from 'styled-components';
import Modal from 'react-responsive-modal';

//Honestly most will also have mainContentWrapper on them, but also specific ones.
//I don't want it to be empty like that at start
const BlogPageWrapper = styled.div`



   // display:grid;
    margin-top:5%;
    grid-template-columns: 100%;
    grid-template-rows: 0.5fr 2fr 0.5fr;
    grid-template-areas:
    "filter"
    "blogs"
    "loadMore";

    padding-bottom:10px;



`;

const FilterPanel = styled.div`

    grid-area:filter;
    text-align:center;
    margin:auto;
    border-bottom: 1px solid black;

    //Prob turn this into grid
    //Then have drop down of most popular tags.
    //This means need tos tore it.
`;


///Panel of all the posts
const BlogsPanel = styled.div`

    grid-area:blogs;
    width:100%;
    margin:auto;
    margin-top:5%;
    padding-bottom:5%;
    //border-bottom: 1px solid black;

   
    
`;


//This actually shouldn't even exist if mobile.
const LoadMoreButton = styled.div`

    grid-area:"loadMore";
    color:rgb(227, 141, 1);
    background-color: black;
    text-transform: uppercase;
    cursor:pointer;
    padding:5px;
    align-self:center;
    justify-self:center;
    width:20%;
    text-align:center;
    margin:auto;
    margin-top:2.5%;
`;

export{

    BlogPageWrapper,
    FilterPanel,
    BlogsPanel,
    LoadMoreButton,
};