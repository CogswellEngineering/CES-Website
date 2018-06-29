import { createSelector } from 'reselect';
import { BLOG_PATH } from 'components/Header/pages';

const blogPageState = (state) => state.get(BLOG_PATH);


const makeSelectPosting = () => createSelector(

    blogPageState,
    (blogPageState) => {

        if (blogPageState == null) 
            return false;

        return blogPageState.get("posting");
    }

)

const makeSelectCurrentPage = () => createSelector(

    blogPageState,
    (blogPageState) => {

        if (blogPageState == null) return 1;

        return blogPageState.get("currentPage");

    }
    
);


const makeSelectPostsPerPage = () => createSelector(

    blogPageState,
    (blogPageState) => {

        if (blogPageState == null) return 5;

        return blogPageState.get("postsPerPage");
    }

);

//Something like this could use generic for, but instantiating an object just for that is excessive,
//rather dupe code, then have that overhead.
const makeSelectError = () => createSelector(

    blogPageState,
    (blogPageState) => {
        

        return (blogPageState == null)? "" : blogPageState.get("error");
    }

)

const makeSelectPosts = (type) => createSelector(

    blogPageState,
    (blogPageState) => {
        
        if (blogPageState == null) return [];

        return blogPageState.get(type + "Posts");
    }
);

const makeSelectPostFields = () => createSelector(

    blogPageState,
    (blogPageState) => {

        if (blogPageState == null) {
                return null;
        }

        return blogPageState.get("postContent");
    }
);

export{
    makeSelectPosts,
    makeSelectPostFields,
    makeSelectError,
    makeSelectPostsPerPage,
    makeSelectCurrentPage,
    makeSelectPosting,
};