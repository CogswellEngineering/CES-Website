//idk why didn't do this ooner
const prefix = 'ces/BlogPage/'

 const PAGE_TURNED = prefix+'PAGE_TURNED';
 const LOAD_POSTS = prefix+'LOAD_POSTS';
 const LOADING_POSTS = prefix+'LOADING_POSTS';
 const LOADED_POSTS = prefix+'LOADED_POSTS';
 //const NEW_POSTS_ADDED = prefix+"NEW_POSTS_ADDED"; Replaced with modifcations made cause not ust when new pots added but if current are modified
 
 
 
 //incase correcting or updating a post, I could force to a new post but editing should be allowed.
 const MODIFICATIONS_MADE = prefix+'MODIFICATIONS_MADE';
 const LINK_ADDED = prefix+'LINK_ADDED';
 const ADD_POST_CLICKED = prefix+'ADD_POST_CLICKED';
 //So much that it's essentially begging for a separation at this point. Wouldn't be hard to make that change, for now just get it working.
 const POSTING = prefix+'POSTING';

//To clear field.
 const POSTED = prefix+'POSTED';

 const POST_FAILED = prefix+'POST_FAILED';

 const POST_FIELD_CHANGED = prefix+'POST_FIELD_CHANGED';


export {
    PAGE_TURNED,
    LOAD_POSTS,
    LOADING_POSTS,
    LOADED_POSTS,
    MODIFICATIONS_MADE,
    ADD_POST_CLICKED,
    POSTING,
    POSTED,
    POST_FAILED,
    POST_FIELD_CHANGED,
    LINK_ADDED,
    TAG_ADDED,
    TAG_REMOVED,
    

}