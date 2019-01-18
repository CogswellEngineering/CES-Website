import { createSelector } from 'reselect';
import { BLOG_PATH } from 'SiteData/constants';




const blogPageState = (state) => state.get(BLOG_PATH);


function getFilteredPosts(filter, posts){

    const filteredPosts = filter.size == 0? posts : posts.filter( post => {

        var matches = 0;
       
        for (var i = 0; i < filter.size; ++i){

            //If matches any tag in post.

            for (var j = 0; j < post.tags.length; ++j){

                console.log("post tag", post.tags[j]);
                if (post.tags[j].title === filter.get(i).title){

                    //Actually can't just return true, caues should meet ALL FILTERS.
                    matches += 1;
                }
            }
        }
        return matches == filter.size;

    });

    return filteredPosts;
}


const makeSelectPosts = () => createSelector(

    blogPageState,
    (blogPageState) => {
        
        if (blogPageState == null) return [];
        

        const toShow = [];
        const amountToShow = blogPageState.get("amountToShow");
        const allPosts = blogPageState.get("allPosts");
        const tagFilter = blogPageState.get("tagFilter");
        //So adding filter for tags
        console.log("all tags", tagFilter);
        const filteredPosts = getFilteredPosts(tagFilter, allPosts);

        console.log("filteredPosts", filteredPosts);


        for (var i = 0; i < amountToShow && i < filteredPosts.length; ++i){

            toShow.push(filteredPosts[i]);
        }
        console.log(toShow);
        
        return toShow;
    }
);

//For visual and deleting them.
const makeSelectTagFilter = () => createSelector(

    blogPageState,
    (blogPageState) => {

        if (blogPageState == null) return [];

        return Array.from(blogPageState.get("tagFilter"));
    }

)

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
        const tagFilter = blogPageState.get("tagFilter");
        //So adding filter for tags
        const filteredPosts = getFilteredPosts(tagFilter, allPosts);

        //All posts filtered.

        return filteredPosts.length;
    }
)




export{

    makeSelectTagFilter,
    makeSelectPosts,
    makeSelectMaxAmountToShow,
    makeSelectAmountToShow,
 
};