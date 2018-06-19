import React, { Component } from 'react';
import styled from 'styled.components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import { pageTurned, modificationsMade, addPostClicked} from './actions';



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

    componentDidMount(){


        //Might need to pull initially, then start listener, I'll see
        //if not dope, if yeah, not hard.

        const props = this.props;
        const fireStoreRef = props.firebase.firestore();
        const blogRef = fireStoreRef.collection("BlogPosts");
        const options = {
            //For changes to alrady added posts.
            includeMetadataChanges: true,
        };

        //Sets up listener to update blog posts.
        this.unsubscribe = blogRef.onSnapshot(options,(snapshot) => {

                if (snapshot.exists){
                    console.log("modification made to blog posts");
                    props.onModificationMade(snapshot);
                }
            }
        );
    }

    componentWillUnmount(){
    
        //Stops pulling blogposts;
        this.unsubscribe();
    }
    
    render(){

        return (<BlogPageWrapper>

                <BlogsPanel>

                </BlogsPanel>

                <BlogPostPanel>
                    {/*Add fields for topic description etc.*/}

                </BlogPostPanel>

            </BlogPageWrapper>
        )
    }
}



 function mapDispatchToProps(dispatch){


    return {

        onModificationMade : (posts) => {

            return dispatch(modificationsMade(posts));
        }
        
        onPageSelected : (page) => {

            return dispatch(pageTurned(page));
        }

        onAddPostClicked : () =>{

            return dispatch(addPostClicked());
        }
    }

 }