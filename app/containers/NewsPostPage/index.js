import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {isTablet} from 'react-device-detect';
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
    USER_PROFILE_PATH,
} from 'SiteData/constants';
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

    tagClicked
} from 'containers/NewsPage/actions';

import {

    Wrapper,
    Thumbnail,
    Header,
    Body,
    Footer,
    SharedSection,
} from 'components/StyledComponents/NewsPostPage';

import {
    Title,
    UploadDate,
    Author
} from 'components/NewsCard';

import {
    UserLink
} from 'components/General';

import Comments from 'components/Comments';
import PostComment from 'components/PostComment';

class NewsPost extends Component{


    constructor(props){

        super(props);

        console.log("props", props);
        
        this.onCommentPosted = this.onCommentPosted.bind(this);
        this.onTagClicked = this.onTagClicked.bind(this);
    }

    componentDidMount(){

        this.pullPostInfo();
        this.props.addView(this.props.match.params.uid);
        //Implement a buffer so if same news post don't pull just reuse.
        //Maybe even have a prebuffer before this is ever visited, based on views.
    }

    pullPostInfo(){

        const postUid = this.props.match.params.uid;

        const {loadPost} = this.props;

        loadPost(postUid);
    }

    onCommentPosted(comment){

        const {commentPosted, loggedInUser, loggedInProfile} = this.props;

        const commentData = {

            
            commenter: {uid: loggedInUser.uid, name: loggedInProfile.displayName, icon: loggedInProfile.profilePicture.url},
            comment,
            postUid: this.props.match.params.uid,
            currentCommentLoad: this.props.comments,
        };


        //Dispatches comment posted to saga.
        commentPosted(commentData);

    }

    renderHeader(){



        const {topic, postDate, author} = this.props.post;
        console.log(postDate);
        const format = "MMMM D, YYYY";

        const profilePath = USER_PROFILE_PATH.split(":")[0];

        return (<Header>
            
                <Title style = {{gridArea:"title", textAlign:"center", fontWeight:"bold"}}> {topic} </Title>
                <UploadDate style = {{gridArea:"date", textAlign:"center"}}> {dateFns.format(postDate,format)} </UploadDate>
                {/*Change this to link to profile later*/}
                <Author style = {{gridArea:"author", textAlign:"center", }}>  
                <UserLink to = { profilePath + author.uid}> {author.name} </UserLink> </Author>
            
            </Header>);
    }

    renderBody(){


        const {content} = this.props.post;

        return (<Body>

                {content}
            
            </Body>);
    }

    onTagClicked = (tag) =>{


        //Push onto history to go to News apge.
        const {history, onTagClicked} = this.props;

        this.props.history.push("/news");
        this.props.onTagClicked(tag);

    }

    renderFooter(){

        const {tags} = this.props.post;

        //Prob not have tags be circuluar
        //or have a min size.
        //SO MANY SIMILIARTIES IN THESE POSTS, NEED TO HAVE COMMON FILE FOR THESE STYLED COMPONENTSSS YO! LOL.
        const domain = "http://localhost:3000";
        const shareUrl = domain + "/news/" + this.props.match.params.uid;
        const shareSize = isTablet? 64 : 48;
        return (<Footer>

                <Title style = {{gridArea:"tagTitle"}}> Tags </Title>
                {  <Tags tags = {tags}  onTagClicked = {this.onTagClicked} style = {{gridArea:"tags"}}/>}

                <Title style = {{gridArea:"shareTitle"}}> Share this Post! </Title>
                <SharedSection style = {{gridArea:"share"}}>

                    <FacebookShareButton url = {shareUrl} style = {{cursor:"pointer"}}>
                        <FacebookIcon size = {shareSize} round = {true}/>
                    </FacebookShareButton>
                    
                    <LinkedinShareButton url = {shareUrl}  style = {{marginLeft:"1%", cursor:"pointer"}}>
                        <LinkedinIcon size = {shareSize} round = {true}/>
                    </LinkedinShareButton>

            </SharedSection>

            </Footer>)
    }


    renderComments(){


        const {comments, loggedInProfile,} = this.props;

        return (
        <div style ={{gridArea:"comments", marginTop:"5%"}}>
                <PostComment style = {{paddingBottom:"5%"}} loggedInProfile = {loggedInProfile} onPost = {this.onCommentPosted}/>
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

    const firebaseState = state.get("firebase");
    if (newsPostState == null || firebaseState == null) return {};

    const loggedInProfile = state.get("CES").get("loggedInProfile");

    console.log("Ever get here?",newsPostState);
    return {

        loggedInUser: firebaseState.auth,
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

        

        onTagClicked: (tag) => {

            return dispatch(tagClicked(tag));
        },

        loadPost: (postUid) => {

            return dispatch(loadPost(postUid));
        },

        addView: (uid) => {

            return dispatch(addView(uid));
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


