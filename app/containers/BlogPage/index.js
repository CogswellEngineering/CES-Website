import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withFirebase } from 'react-redux-firebase';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import { makeSelectPosts, makeSelectPostFields, makeSelectError,
    makeSelectCurrentPage, makeSelectPostsPerPage,
    makeSelectPosting,
} from './selectors';
import { pageTurned, modificationsMade, addPostClicked, postFieldChanged} from './actions';
import { BLOG_PATH } from 'components/Header/pages';
import { makeSelectLoggedInProfile } from 'containers/App/selectors';
import BlogPost from 'components/BlogPost';

//Might need select for categorizing it if that's neccessarry, that's easy change I can make later.
import StyledForm, {StyledButton,StyledLabel,ErrorMessage,StyledInput, StyledSelect, StyledOption} from 'components/StyledForm'
import ReactPaginate from 'react-paginate';

//Pagination imports
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

import {

    BlogPageWrapper,
    BlogsPanel,
    BlogPostPanel,
} from 'components/StyledComponents/BlogPage';

class BlogPage extends Component{

    constructor(props){
        super(props);

        this.unsubscribe = null;
        
    }


    componentDidMount(){

        const props = this.props;
        const fireStoreRef = props.firebase.firestore();
        const blogRef = fireStoreRef.collection("Blog");
        const options = {
            //For changes to alrady added posts.
            includeMetadataChanges: true,
        };

        this.unsubscribe = blogRef.onSnapshot(options,(docSnapshot) => {

                    var newPosts = [];
                    const docs = docSnapshot.docs;
                    for ( const index in docSnapshot.docs){

                        const doc = docs[index];

                        if (doc.exists){
                            newPosts.push(doc.data());
                        }
                    }

                    this.props.onModificationMade(newPosts);                
            }
        );
    }

    componentWillUnmount(){
    
        //Stops pulling blogposts;
        this.unsubscribe();
    }

    
    render(){

        const props = this.props;
        const isAdmin = props.loggedInUser.isAdmin;

        const { allPosts, shownPosts, error, postContent, postsPerPage, currentPage, posting,
            onFieldChanged, onPostClicked, onPageSelected   } = props;


        if (postContent == null) return null;



        return (<BlogPageWrapper>

             
                <BlogsPanel>
                                      
                    {shownPosts.map(post => {

                        return <BlogPost key ={post.author+post.topic} author={post.author} topic={post.topic} body={post.body}/> 
                    })}
                
                     <Pagination pageSize = {postsPerPage} current = {currentPage} total = {allPosts.length}
                            onChange = {(page) => {onPageSelected(page);}}
                        />

                </BlogsPanel>

                <BlogPostPanel hidden = {!isAdmin}>

                    <StyledForm onSubmit = {(evt) => { evt.preventDefault();onPostClicked(postContent); }}>

                        <StyledLabel for = "topic"> Topic </StyledLabel>
                        <StyledInput id = "topic" name = "topic" 
                        value={postContent.topic} 
                        onChange={(evt) => { onFieldChanged(evt); }}
                        />
                        <StyledLabel for = "body"> Body </StyledLabel>
                        <StyledInput id = "body" name = "body" 
                        value={postContent.body} 
                        onChange={(evt) => { onFieldChanged(evt); }}
                        />
                        
                        <ErrorMessage> {error} </ErrorMessage>

                        {!posting? 
                            <StyledButton type="submit"> Post </StyledButton> 
                         :  
                            <p>   Posting... </p>
                        }
                        
                    </StyledForm>
                </BlogPostPanel>

            </BlogPageWrapper>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    
    allPosts: makeSelectPosts("all"),
    shownPosts : makeSelectPosts("shown"),
    postContent: makeSelectPostFields(),
    loggedInUser: makeSelectLoggedInProfile(),
    currentPage :makeSelectCurrentPage(),
    postsPerPage : makeSelectPostsPerPage(),
    error : makeSelectError(),
    posting : makeSelectPosting(),

});


 function mapDispatchToProps(dispatch){


    return {

        onFieldChanged : (evt) => {

            const target = evt.target;
            return dispatch(postFieldChanged(target.name,target.value));

        },

        onModificationMade : (posts) => {

            return dispatch(modificationsMade(posts));
        },
        
        onPageSelected : (page) => {

            console.log("page",page);

            return dispatch(pageTurned(page));
        },

        onPostClicked : (post) =>{

            return dispatch(addPostClicked(post));
        },
    }

 }

 const withConnect = connect(mapStateToProps, mapDispatchToProps);
 const withReducer = injectReducer({key:BLOG_PATH, reducer});
 const withSaga = injectSaga({key:BLOG_PATH,saga});

 export default compose(

    withConnect,
    withReducer,
    withSaga,
    withFirebase

 )(BlogPage);
