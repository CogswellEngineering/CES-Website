import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import {
    SPECIFIC_POST,
} from 'components/Header/pages';

import {

    loadPost,
    //When they enter.
    addView,
    commentPosted,
    //This will be when they leave,
    addLike,

} from './actions';

import {

    Wrapper,
    Thumbnail,
    Header,
    Body,
    Footer,
} from 'components/StyledComponents/NewsPostPage';

import Comments from 'components/Comments';

class NewsPost extends Component{


    constructor(props){

        super(props);

        console.log("props", props);
        
    }

    componentDidMount(){

        this.pullPostInfo();
        //Implement a buffer so if same news post don't pull just reuse.
        //Maybe even have a prebuffer before this is ever visited, based on views.
    }

    pullPostInfo(){

        const postUid = this.props.match.params.uid;

        const {loadPost} = this.props;

        loadPost(postUid);
    }

    renderHeader(){


        const {title, uploadDate, author} = this.props.post;


        return (<Header>
            
                <div style = {{gridArea:"title", fontSize:"20px", fontWeight:"bold"}}> {title} </div>
                <div style = {{gridArea:"uploadDate"}}> {uploadDate} </div>
                <div style = {{gridArea:"author"}}> by {author} </div>
            
            </Header>);
    }

    renderBody(){


        const {description} = this.props.post;

        return (<Body>

                {description}
            
            </Body>);
    }

    renderFooter(){


        return (<Footer>

            </Footer>)
    }


    render(){


        if (this.props.post == null) return null;

        const {thumbnail} = this.props.post;
        const comments = this.props.comments;
        return (

            <Wrapper>
                <Thumbnail image = {thumbnail}/>

                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
                <Comments comments = {comments} style = {{gridArea:"comments"}}/>

            </Wrapper>
        );
    }
}



const mapStateToProps = (state) => {

    if (state==null) return null;

    const newsPostState = state.get(SPECIFIC_POST);

    if (newsPostState == null) return {};

    console.log("Ever get here?",newsPostState);
    return {

        post: newsPostState.get("postInfo"),
        comments: newsPostState.get("comments"),
        //Will have buffer  for this
        likeCount: newsPostState.get("likeCount"),
        viewCount: newsPostState.get("viewCount"),
    };
}

const mapDispatchToProps = dispatch => {


    return {

        
        loadPost: (postUid) => {

            return dispatch(loadPost(postUid));
        },

        addView: () => {

            return dispatch(addView());
        },

        commentPosted: (comment) => {

            return dispatch(commentPosted(comment));
        },

        addLike: () => {

            return dispatch(addLike());
        },
    };
}


const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key: SPECIFIC_POST, reducer});
const withSaga = injectSaga({key: SPECIFIC_POST, saga});

export default compose(

    withConnect,
    withReducer,
    withSaga
)(NewsPost);


