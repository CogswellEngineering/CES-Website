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
    makeSelectPosting,makeSelectAmountToShow, makeSelectMaxAmountToShow
} from './selectors';

import {  
    modificationsMade, addPostClicked, postFieldChanged, 
     loadMore} from './actions';


import { BLOG_PATH } from 'components/Header/pages';
import { makeSelectLoggedInProfile } from 'containers/App/selectors';
import NewsCard from 'components/NewsCard';

//Might need select for categorizing it if that's neccessarry, that's easy change I can make later.
import StyledForm, {StyledButton,StyledLabel,ErrorMessage,StyledInput, StyledSelect, StyledOption} from 'components/StyledForm'

//Pagination imports

//const ReactTags = require('react-tag-input').WithOutContext;

import TagsInput from 'react-tagsinput'
 
import 'react-tagsinput/react-tagsinput.css'

import {

    BlogPageWrapper,
    BlogsPanel,
    LoadMoreButton,
    BlogPostPanel,
    PostPanelButton,
    StyledTextArea,
    
} from 'components/StyledComponents/NewsPage';



class BlogPage extends Component{

    constructor(props){
        super(props);

        this.unsubscribe = null;

        this.state =  {
            postModalOpen:false,
            linkModalOpen:false,
            tags:[],
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
     
        this.updateTags = this.updateTags.bind(this);
        this.onCardClicked = this.onCardClicked.bind(this);
        
    }


    updateTags(tags){


        this.setState({
            tags:tags,
        })
    }

   
   
    openModal(evt){

        const target = evt.target;
        console.log("target name", target.name);
        this.setState({
            [target.name]: true,
        })
    }

    closeModal(evt){

        const target = evt.target;
        console.log(target);
        this.setState({
         postModalOpen: false,
        })
    }

    


    componentDidMount(){

        const props = this.props;
        const fireStoreRef = props.firebase.firestore();
        const newsCards = fireStoreRef.collection("ClubInfo").doc("News").collection("NewsCards");
        const options = {
            //For changes to alrady added posts.
            includeMetadataChanges: true,
        };

        this.unsubscribe = newsCards.onSnapshot(options,(docSnapshot) => {

                    var newPosts = [];
                    const docs = docSnapshot.docs;
                    for ( const index in docs){

                        const doc = docs[index];

                        if (doc.exists){
                            console.log(doc.data());
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


    onCardClicked = (postUid) =>{


        console.log("news card", postUid);
        this.props.history.push("/news/"+postUid);
    }
    
    render(){

        const props = this.props;
        const isAdmin = props.loggedInUser.isAdmin;

        const { posts, amountToShow,maxAmountToShow, error, postContent, posting,
            onFieldChanged, onPostClicked, onLoadMore,  } = props;




        return (<BlogPageWrapper>

             
                <BlogsPanel>
                                      
                    {posts && posts.map(post => {

                        return <NewsCard  key ={post.topic + "_" + post.author} {...post} style = {{marginTop:"1%"}} onCardClicked = {this.onCardClicked}/> 
                    })}

                    

                </BlogsPanel>
                <hr style = {{border:"1px solid black"}}></hr>

                 { amountToShow < maxAmountToShow && <LoadMoreButton onClick = {(evt) => {
                        evt.preventDefault();

                        onLoadMore(5);
                }}> Load More </LoadMoreButton>
                
                }
                <PostPanelButton name = "postModalOpen" hidden = {!isAdmin} onClick = {this.openModal}> Add Post </PostPanelButton>
                
                {/*At this point, this should honestly be in it's own folder, would just have to pass in more props.*/}
                {postContent && <BlogPostPanel name = "postModalOpen" open = {this.state.postModalOpen} center = {true} onClose={this.closeModal}>



                    <form name = "postModalOpen"  onSubmit = {(evt) => { evt.preventDefault();
                    
                        postContent.tags = this.state.tags; 
                        onPostClicked(postContent); 
                    }}>

                        <StyledLabel for = "topic"> Topic </StyledLabel>
                        <StyledInput id = "topic" name = "topic" 
                        value={postContent.topic} 
                        onChange={(evt) => { onFieldChanged(evt); }}
                        />
                        
                        {/*Change body and tags to be text areas*/}
                        <StyledLabel for = "body"> Body </StyledLabel>
                        <StyledTextArea id = "body" name = "body" 
                        value={postContent.body} 
                        onChange={(evt) => { onFieldChanged(evt); }}>
            

                        </StyledTextArea>


                        <StyledLabel for = "tags"> Tags </StyledLabel>

                      
                    

                    <TagsInput name="tags" value={this.state.tags} onChange={this.updateTags}/>
                        
                        <ErrorMessage> {error} </ErrorMessage>

                        {!posting? 
                            <StyledButton type="submit"> Post </StyledButton> 
                         :  
                            <p>   Posting... </p>
                        }
                        
                    </form>

                  
                </BlogPostPanel>
                }

            </BlogPageWrapper>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    
    maxAmountToShow: makeSelectMaxAmountToShow(),
    amountToShow : makeSelectAmountToShow(),
    posts: makeSelectPosts(),
    postContent: makeSelectPostFields(),
    loggedInUser: makeSelectLoggedInProfile(),
    error : makeSelectError(),
    posting : makeSelectPosting(),

});


 function mapDispatchToProps(dispatch){


    return {


        onLoadMore : (amount) => {

            return dispatch(loadMore(amount));
        },
       
        onLinkAdded : (content) => {

            return dispatch(addLink(content));

        },
        onFieldChanged : (evt) => {

            const target = evt.target;
            return dispatch(postFieldChanged(target.name,target.value));

        },

        onModificationMade : (posts) => {

            return dispatch(modificationsMade(posts));
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
