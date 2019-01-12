import React, {Component} from 'react';
import styled from 'styled-components';

import {
    Label,
    Field,
    ThumbnailDropzone,
    Button,
} from './generalFormComponents';
import TagForm from './tagForm';

const Wrapper = styled.form`


`;

const TitleField = styled(Field)`

`;

const ContentField = styled(Field)`
    height:400px;
    overflow:auto;
`;

export default class NewsPostForm extends Component{


    constructor(props){

        super(props);

        this.state = {

            thumbnail: null,
            topic: "",
            content: "",
            tags:[],
            
        }

        this.onThumbnailField = this.onThumbnailField.bind(this);
        this.onUpdateTextField = this.onUpdateTextField.bind(this);
        this.onTagAdded = this.onTagAdded.bind(this);
        this.onTagRemoved = this.onTagRemoved.bind(this);
        this.onPostSubmitted = this.onPostSubmitted.bind(this);
        this.resetState = this.resetState.bind(this);

    }

    resetState = () => {

        this.setState({

            thumbnail: null,
            topic: "",
            content: "",
            tags: [],
        });

    }

    onThumbnailFieldUpdated = (acceptedFiles, rejectedFiles) => {

        this.setState({
            thumbnail:acceptedFiles[0],
        });
    }

    
    onUpdateTextField = (evt) => {

        const target = evt.target;

        this.setState({
            [target.name] : target.value
        });
    }

    onTagAdded = (tag) => {

        this.setState(state => {

            const tags = state.tags.concat(tag);

            return {
                tags
            };
        })
    }

    onTagRemoved = (tag) => {

        this.setState(state => {

            //Filtering to not include the removed tag
            const tags = state.tags.filter( currentTag => {

                return currentTag.title !== tag.title;
            });


            return {
                tags
            };
        });
    }


    onPostSubmitted = (evt) => {

        evt.preventDefault();

        this.props.onNewsPostSubmitted(this.state);
        this.resetState();
    }

    render(){

        return (
            <Wrapper onSubmit = {this.onPostSubmitted}>

                <div>
                    <ThumbnailDropzone id = "thumbnail">

                         <Label for = "thumbnail"> Upload thumbnail </Label>

                    </ThumbnailDropzone>
                </div>

                <div>

                    <Label for = "topic"> Topic </Label>
                    <Input type = "text" id = "topic" value = {this.state.topic} onChange = {this.onUpdateTextField}/>

                </div>

                <div>
                    <Label for = "content"> Content </Label>
                    <ContentField type = "text" id = "content" value = {this.state.content} onChange = {this.onUpdateTextField}/>
                </div>

                <div>
                    <Label> Tag your Post </Label>
                    <TagForm onAddTag = {this.onTagAdded}/>
                </div>

                <Button type = "submit"/>



            </Wrapper>

        )
    }

}