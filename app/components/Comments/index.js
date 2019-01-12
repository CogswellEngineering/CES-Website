import React, {Component} from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';

//Will move these to be own component later on.
const Wrapper = styled.div`


    
`;

const Comment = styled.div`


    display:grid;

    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr auto;

    grid-template-areas:
    "icon author"
    "icon postDate"
    "content content";
`;

const Icon = styled.div`

    grid-area:icon;
    background-image: url(${props => props.image});
    background-size: 100% 100%;
    background-position:center;
    background-repeat: no-repeat;

`;

const Author = styled.div`

    grid-area:author;

`;

const Content = styled.div`

    grid-area:content;

`;

const PostDate = styled.div`

    grid-area:postDate;

`;


class Comments extends React.PureComponent{


    render(){

        const {style, comments} = this.props;

        return (<Wrapper style={style}>
        
            {comments && comments.map(comment => {

                const {icon, name, postDate, content} = comment;
                const format = "MM D, YYYY";
                return <Comment>
                        <Icon image = {icon}/>
                        <Author> {name} </Author>
                        <PostDate> {dateFns.format(postDate,format)} </PostDate>

                        <Content> {content} </Content>    
                        
                        </Comment>
            })}
            
        
        
        </Wrapper>)

    }
}

export default Comments;