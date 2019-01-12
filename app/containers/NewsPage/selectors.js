import { createSelector } from 'reselect';
import { BLOG_PATH } from 'components/Header/pages';

const blogPageState = (state) => state.get(BLOG_PATH);

const makeSelectPosts = () => createSelector(

    blogPageState,
    (blogPageState) => {
        
        if (blogPageState == null) return [];
        

        const toShow = [];
        const amountToShow = blogPageState.get("amountToShow");
        const allPosts = blogPageState.get("allPosts");
        for (var i = 0; i < amountToShow && i < allPosts.length; ++i){

            toShow.push(allPosts[i]);
        }
        console.log(toShow);
        
        return toShow;
    }
);

const makeSelectAmountToShow = () => createSelector(


    blogPageState,
    (blogPageState) => {


        if (blogPageState == null) return 0;

        const amountToShow = blogPageState.get("amountToShow");

        return amountToShow;
    }
)

const makeSelectMaxAmountToShow = () => createSelector(


    blogPageState,
    (blogPageState) => {

        if (blogPageState == null) return 0;

        const allPosts = blogPageState.get("allPosts");

        return allPosts.length;
    }
)




export{
    makeSelectPosts,
    makeSelectMaxAmountToShow,
    makeSelectAmountToShow,
 
};