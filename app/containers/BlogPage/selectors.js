import { createSelector } from 'reselect';
import { BLOG_PATH } from 'components/Header/pages';

const blogPageState = (state) => state.get(BLOG_PATH);

//Something like this could use generic for, but instantiating an object just for that is excessive,
//rather dupe code, then have that overhead.
const makeSelectError = () => createSelector(

    blogPageState,
    (blogPageState) => {
        

        return (blogPageState == null)? null : blogPageState.get("error");
    }

)

const makeSelectPosts = () => createSelector(

    blogPageState,
    (blogPageState) => {
        
        if (blogPageState == null) return null;

        return blogPageState.get("posts");
    }
);

const makeSelectPostFields = () => createSelector(

    blogPageState,
    (blogPageState) => {
        if (blogPageState == null) return null;

        return blogPage.get("postContent");
    }
);

export{
    makeSelectPosts,
    makeSelectPostFields,
    makeSelectError,
};