import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withFirebase } from 'react-redux-firebase';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import { makeSelectPosts, makeSelectPostFields, makeSelectError } from './selectors';
import { pageTurned, modificationsMade, addPostClicked, postFieldChanged} from './actions';
import { BLOG_PATH } from 'components/Header/pages';
import { makeSelectLoggedInProfile } from 'containers/App/selectors';
import BlogPost from 'components/BlogPost';

//Might need select for categorizing it if that's neccessarry, that's easy change I can make later.
import StyledForm, {StyledButton,StyledLabel,ErrorMessage,StyledInput, StyledSelect, StyledOption} from 'components/StyledForm'




//Honestly most will also have mainContentWrapper on them, but also specific ones.
const BlogPageWrapper = styled.div`



`;


///Panel of all the posts
const BlogsPanel = styled.div`


`;


//Pannel for posting.
const BlogPostPanel = styled.div`

`;

class BlogPage extends Component{

    constructor(props){
        super(props);

        this.unsubscribe = null;
        
    }

    componentWillMount(){
        //This happens
        console.log("will I mount?");
    }

    componentDidMount(){

        //This does not.
        console.log("Do I not get here?");

        //Might need to pull initially, then start listener, I'll see
        //if not dope, if yeah, not hard.

        
        const props = this.props;
        const fireStoreRef = props.firebase.firestore();
        const blogRef = fireStoreRef.collection("Blog");
        const options = {
            //For changes to alrady added posts.
            includeMetadataChanges: true,
        };



        //Sets up listener to update blog posts.
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

    //Prob just get profile, then go based off that
    
    render(){

        const props = this.props;
        console.log(props);
        const isAdmin = props.loggedInUser.isAdmin;

        const { posts, error, postContent, 
            onFieldChanged, onPostClicked,   } = props;
        console.log("posts",posts);
        if (postContent == null) return null;



        return (<BlogPageWrapper>

                <BlogsPanel>

                   
                    {posts.map(post => {

                        return <BlogPost key ={post.author+post.topic} author={post.author} topic={post.topic} body={post.body}/> 
                    })}

                </BlogsPanel>

                <BlogPostPanel hidden = {!isAdmin}>

                    <StyledForm onSubmit = {(evt) => { onPostClicked(evt,postContent); }}>

                        <StyledLabel for = "topic"> Topic </StyledLabel>
                        <StyledInput id = "topic" name = "topic" 
                        value={postContent.topic} 
                        onChange={(evt) => { onFieldChanged(evt); }}
                        />
                        <StyledLabel for = "body"> Body </StyledLabel>
                        <StyledInput id = "body" name = "body" 
                        value={postContent.info} 
                        onChange={(evt) => { onFieldChanged(evt); }}
                        />
                        
                        <ErrorMessage> {error} </ErrorMessage>
                        <StyledButton type="submit"> Post </StyledButton> 
                        
                        
                    </StyledForm>
                </BlogPostPanel>

            </BlogPageWrapper>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    
    //Will pass in selector, in seletor will check admin status.
    posts: makeSelectPosts(),
    postContent: makeSelectPostFields(),
    loggedInUser: makeSelectLoggedInProfile(),
    error : makeSelectError(),
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

            return dispatch(pageTurned(page));
        },

        onAddPostClicked : (evt, post) =>{

            if (evt && evt.preventDefault){
                evt.preventDefault();
            }
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
