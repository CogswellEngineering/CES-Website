import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import Pagination from 'rc-pagination';


//Honestly most will also have mainContentWrapper on them, but also specific ones.
const BlogPageWrapper = styled.div`


    display:flex;
    flex-direction:column;
    

`;



///Panel of all the posts
const BlogsPanel = styled.div`

    width:80%;
    margin:auto;

`;


//Pannel for posting.
const BlogPostPanel = styled(Modal)`

    margin-top:2.5%;

`;



const PostPanelButton = styled.button`

`;

const PostActions = styled.span`


`;

const PostActionButtons = styled.button`


`;

const StyledPagination = styled(Pagination)`

    margin-left:40%;
`;

const StyledTextArea = styled.textarea`

    width:100%;
    padding-bottom:20%;
    border: 1px solid black;
    vertical-align: baseline;
    font-family: sans-serif;
    font-size: 14px;
    line-height: 20px;
    &:focus{

        border:1px solid #c6e28d;
        box-shadow: 0 0 1px;


        outline:none;
    };

`;


export{

    BlogPageWrapper,
    BlogsPanel,
    BlogPostPanel,
    PostPanelButton,
    PostActions,
    PostActionButtons,
    StyledPagination,
    StyledTextArea,
    AddLinkPanel,
};