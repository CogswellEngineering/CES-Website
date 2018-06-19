import { createSelector } from 'reselect';
import { BLOG_PATH } from 'components/Header/pages';

const blogPageState = (state) => state.get(BLOG_PATH);


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
};