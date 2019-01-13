import React, {Component} from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone'
import Tags from 'components/Tags';
import {
    Label,
    Field,
    ThumbnailDropzone,
    Button,
    ContentField,
    Title,
} from './generalFormComponents';
import TagForm from './tagForm';

const Wrapper = styled.div`


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

        this.onThumbnailFieldUpdated = this.onThumbnailFieldUpdated.bind(this);
        this.onUpdateTextField = this.onUpdateTextField.bind(this);
        this.onTagAdded = this.onTagAdded.bind(this);
        this.onTagRemoved = this.onTagRemoved.bind(this);
        this.onPostSubmitted = this.onPostSubmitted.bind(this);
        this.resetState = this.resetState.bind(this);

    }

    componentWillUnmount(){

        if (this.state.thumbnail != null){

            window.URL.revokeObjectURL(this.state.thumbnail);   
        }
    }

    resetState = () => {


        if (this.state.thumbnail != null){

            window.URL.revokeObjectURL(this.state.thumbnail);
            
        }

        this.setState({

            thumbnail: null,
            topic: "",
            content: "",
            tags: [],
        });

    }

    //Gota think of way to reuse these functions for both components.
    onThumbnailFieldUpdated = (acceptedFiles, rejectedFiles) => {
 
        this.setState( state => {

            if (state.thumbnail != null){

                    //Get rid of cached preview of thumbnail uploaded before.
                    window.URL.revokeObjectURL(state.thumbnail);
            }

            return {
                thumbnail:acceptedFiles[0]
            }
        });

    }

    
    onUpdateTextField = (evt) => {

        const target = evt.target;

        this.setState({
            [target.id] : target.value
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

        this.props.onSubmit(this.state);

        //This will do the revoking of thumbnail for me.
        this.resetState();
    }

    render(){

        return (
            <Wrapper >
                <Title> Create News Post </Title>

                <div>
                    <Dropzone id = "thumbnail" onDrop = {this.onThumbnailFieldUpdated}>

                    {({getRootProps, getInputProps}) => (
                        //Should make this the same size as thumbnail would be for news.
            <ThumbnailDropzone {...getRootProps()}>
              <input {...getInputProps()} />
                {this.state.thumbnail?
                    
                    <img style = {{width:"inherit",height:"inherit"}} src = {window.URL.createObjectURL(this.state.thumbnail)}/>
                :
                <p>Add A Thumbnail For Your Event</p>
                }
            </ThumbnailDropzone>
          )}
                    </Dropzone>
                </div>

                <div style = {{marginTop:"1%"}}>

                    <Label for = "topic"> Topic </Label>
                    <Field type = "text" id = "topic" value = {this.state.topic} onChange = {this.onUpdateTextField}/>

                </div>

                <div>
                    <Label for = "content" style = {{display:"block"}}> Content </Label>
                    <ContentField type = "text" id = "content" value = {this.state.content} onChange = {this.onUpdateTextField}
                        minRows = {5} 
                    />
                </div>

                <div>
                    <Label> Tag your Post </Label>
                    <Tags tags = {this.state.tags}/>
                    <TagForm onAddTag = {this.onTagAdded}/>
                </div>

                <Button onClick = {this.onPostSubmitted}  style = {{width:"50%",marginLeft:"25%",marginTop:"2%", }}>
                        Add News Post
                </Button>



            </Wrapper>

        )
    }

}