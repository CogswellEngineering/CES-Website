import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withFirebase } from 'react-redux-firebase';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { makeSelectPosts, makeSelectAmountToShow, makeSelectMaxAmountToShow,makeSelectTagFilter
} from './selectors';

import { modificationsMade, loadMore, tagClicked, removeTagFilter} from './actions';


import { BLOG_PATH } from 'components/Header/pages';
import NewsCard from 'components/NewsCard';

//Might need select for categorizing it if that's neccessarry, that's easy change I can make later.
import StyledForm, {StyledButton,StyledLabel,ErrorMessage,StyledInput, StyledSelect, StyledOption} from 'components/StyledForm'

import {

    BlogPageWrapper,
    BlogsPanel,
    LoadMoreButton,
    BlogPostPanel,
    PostPanelButton,
    StyledTextArea,
    FilterPanel,
    
} from 'components/StyledComponents/NewsPage';

import Tags from 'components/Tags';


class BlogPage extends Component{

    constructor(props){
        super(props);

        this.unsubscribe = null;

    

        this.onCardClicked = this.onCardClicked.bind(this);
    }




    componentDidMount(){

        const props = this.props;
        const fireStoreRef = props.firebase.firestore();
        const newsCards = fireStoreRef.collection("ClubInfo").doc("News").collection("NewsCards");
        const options = {
            //For changes to alrady added posts.
            includeMetadataChanges: true,
        };

        //Not really NEED to be real time for this lol, but eh for now its fine lol.
        this.unsubscribe = newsCards.orderBy("postDate","desc").onSnapshot(options,(docSnapshot) => {

                    var newPosts = [];
                    const docs = docSnapshot.docs;
                    for ( const index in docs){

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


    onCardClicked = (postUid) =>{


        console.log("news card", postUid);
        this.props.history.push("/news/"+postUid);
    }
    
    render(){

        const props = this.props;

        const { posts, amountToShow,maxAmountToShow, error,
            onTagClicked, onTagRemove, onLoadMore, filterApplied, } = props;



        //Just hide filter header until filter applied until have dropdown of most views implemented.
        return (<BlogPageWrapper>

                {filterApplied.length > 0 && <FilterPanel>
                    <p style = {{fontWeight:"bold", color:"rgb(230, 151, 7)", textTransform:"uppercase"}}> News Tagged </p>
                    <Tags tags = {filterApplied} onTagClicked = {onTagRemove}/>

                </FilterPanel>}
             
                <BlogsPanel>
                                      
                    {posts && posts.map(post => {

                        return <NewsCard  key ={post.topic + "_" + post.author.name} {...post} style = {{marginTop:"1%"}} 
                        onCardClicked = {this.onCardClicked} onTagClicked = {onTagClicked}/> 
                        
                    })}

                </BlogsPanel>

                    

                 { amountToShow < maxAmountToShow && <div style = {{width:"80%", border:"0.5px solid white", margin:"auto"}}/> &&
                    <LoadMoreButton onClick = {(evt) => {
                        evt.preventDefault();

                        onLoadMore(5);
                }}>
                 Load More </LoadMoreButton>
                
                }
               

            </BlogPageWrapper>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    
    filterApplied : makeSelectTagFilter(),
    maxAmountToShow: makeSelectMaxAmountToShow(),
    amountToShow : makeSelectAmountToShow(),
    posts: makeSelectPosts(),

});


 function mapDispatchToProps(dispatch){


    return {

        onTagClicked: (tag) => {

            return dispatch(tagClicked(tag));
        },

        onTagRemove: (tag) => {

            return dispatch(removeTagFilter(tag));
        },

        onLoadMore : (amount) => {

            return dispatch(loadMore(amount));
        },
        onModificationMade : (posts) => {

            return dispatch(modificationsMade(posts));
        },
        
    }

 }

 const withConnect = connect(mapStateToProps, mapDispatchToProps);
 const withReducer = injectReducer({key:BLOG_PATH, reducer});

 export default compose(

    withConnect,
    withReducer,
    withFirebase

 )(BlogPage);
