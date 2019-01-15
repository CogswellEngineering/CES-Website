import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {

    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
} from 'react-share';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import dateFns from 'date-fns';
import {
    SPECIFIC_POST,
} from 'components/Header/pages';
import Tags from 'components/Tags';
import {

    loadPost,
    //When they enter.
    addView,
    commentPosted,
    //This will be when they leave,
    addLike,

} from './actions';

import {

    Title,
    Wrapper,
    Thumbnail,
    Header,
    Body,
    Footer,
    SharedSection,
} from 'components/StyledComponents/NewsPostPage';

import {
    UserLink
} from 'components/General';

import Comments from 'components/Comments';
import PostComment from 'components/PostComment';

class NewsPost extends Component{


    constructor(props){

        super(props);

        console.log("props", props);
        
    }

    componentDidMount(){

        window.scrollTo(0,0);
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



        const {topic, postDate, author} = this.props.post;
        console.log(postDate);
        const format = "MMMM D, YYYY";
        return (<Header>
            
                <div style = {{gridArea:"title", fontSize:"20px", textAlign:"center", fontWeight:"bold"}}> {topic} </div>
                <div style = {{gridArea:"date", textAlign:"center"}}> {dateFns.format(postDate,format)} </div>
                {/*Change this to link to profile later*/}
                <div style = {{gridArea:"author", textAlign:"center", }}>  
                <UserLink to = {"/account/" + author.uid}> {author.name} </UserLink> </div>
            
            </Header>);
    }

    renderBody(){


        const {content} = this.props.post;

        return (<Body>

                {content}
            
            </Body>);
    }

    renderFooter(){

        const {tags} = this.props.post;

        //Prob not have tags be circuluar
        //or have a min size.
        //SO MANY SIMILIARTIES IN THESE POSTS, NEED TO HAVE COMMON FILE FOR THESE STYLED COMPONENTSSS YO! LOL.
        const domain = "http://localhost:3000";
        const shareUrl = domain + "/news/" + this.props.match.params.uid;
        return (<Footer>

                <Title style = {{gridArea:"tagTitle"}}> Tags </Title>
                {  <Tags tags = {tags}  style = {{gridArea:"tags"}}/>}

                <Title style = {{gridArea:"shareTitle"}}> Share this Post! </Title>
                <SharedSection style = {{gridArea:"share"}}>

                    <FacebookShareButton url = {shareUrl} style = {{cursor:"pointer"}}>
                        <FacebookIcon size = {48} round = {true}/>
                    </FacebookShareButton>
                    
                    <LinkedinShareButton url = {shareUrl}  style = {{marginLeft:"1%", cursor:"pointer"}}>
                        <LinkedinIcon size = {48} round = {true}/>
                    </LinkedinShareButton>

            </SharedSection>

            </Footer>)
    }


    renderComments(){


        const {comments,commentPosted, loggedInProfile,} = this.props;

        return (
        <div style ={{gridArea:"comments"}}>
                <PostComment loggedInProfile = {loggedInProfile} onPost = {commentPosted}/>
                <Comments comments = {comments} />
        </div>);
    }

    render(){


        console.log("post loaded", this.props.post);
        if (this.props.post == null) return null;

        const {thumbnail} = this.props.post;
        
        return (

            <Wrapper>
                <Thumbnail image = {thumbnail}/>

                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
                {this.renderComments()}
                
            </Wrapper>
        );
    }
}



const mapStateToProps = (state) => {

    if (state==null) return {};

    const newsPostState = state.get(SPECIFIC_POST);

    if (newsPostState == null) return {};

    const loggedInProfile = state.get("CES").get("loggedInProfile");

    console.log("Ever get here?",newsPostState);
    return {

        loggedInProfile,
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


