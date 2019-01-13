import React, {Component} from 'react';
import styled from 'styled-components';
import DatePicker from "react-datepicker"; 
import Dropzone from 'react-dropzone'
import {
    Label,
    Field,
    ThumbnailDropzone,
    Button,
    ContentField,
    Title
} from './generalFormComponents';
import TagForm from './tagForm';
import Tags from 'components/Tags';


import "react-datepicker/dist/react-datepicker.css";

const Wrapper = styled.div`

   

`;


export default class EventPostForm extends Component{


    constructor(props){

        super(props);

        this.state = {

            //pdate event page to just concat thumbnail at start of gallery.
            thumbnail:null,
            title:"",
            description:"",
            //Prob object instead, just being lazy now, just string is okay, no need to separate
            //UNLESS HAVE FILTER FOR LOCATION, but that's later.
            location: "",
            //Find package for picking dates.
            eventDate:new Date(),
            //Optional
            tags:[],
            agenda:[],
            gallery:[],

        };


        this.onEventSubmitted = this.onEventSubmitted.bind(this);
        this.onUpdateEventDate = this.onUpdateEventDate.bind(this);
        this.onThumbnailFieldUpdated = this.onThumbnailFieldUpdated.bind(this);
        this.onUpdateTextField = this.onUpdateTextField.bind(this);
        this.onTagAdded = this.onTagAdded.bind(this);
        this.onTagRemoved = this.onTagRemoved.bind(this);
        this.resetState = this.resetState.bind(this);


    }

    


    componentWillUnmount(){

        if (this.state.thumbnail != null){

            window.URL.revokeObjectURL(this.state.thumbnail);   
        }
    }

    resetState(){


        if (this.state.thumbnail != null){

            window.URL.revokeObjectURL(this.state.thumbnail);
            
        }

        this.setState({

            //pdate event page to just concat thumbnail at start of gallery.
            thumbnail:null,
            title:"",
            description:"",
            //Prob object instead, just being lazy now, just string is okay, no need to separate
            //UNLESS HAVE FILTER FOR LOCATION, but that's later.
            location: "",
            //Find package for picking dates.
            eventDate:new Date(),
            //Optional
            tags:[],
            agenda:[],
            gallery:[],

        });
    }


    //Alot of these similiar to other form.
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



    //Been alternating arrows and not, honestly no real reason.
    onUpdateEventDate = (date) =>{

        this.setState({

            eventDate: date,
        });
    }


    onEventSubmitted = (evt) => {

        evt.preventDefault();

        this.props.onSubmit(this.state);
        this.resetState();
    }



    render(){


        return (
            <Wrapper >
                <Title> Create Event </Title>
               
                <Dropzone id = "thumbnail" onDrop = {this.onThumbnailFieldUpdated}>

                    {({getRootProps, getInputProps}) => (
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

                <div style = {{gridArea:"dateSelection", marginTop:"1%"}}>
                    <Label >  Select the Date of your Event </Label>
                    <DatePicker
                            showTimeSelect
                            selected={this.state.eventDate}
                            onChange={this.onUpdateEventDate    }
                        />
                </div>


                <div style = {{marginTop:"1%"}}>

                    <Label for = "title"> Title </Label>
                    <Field type = "text" id = "title" value = {this.state.title} onChange = {this.onUpdateTextField}/>

                </div>

                <div>
                    <Label for = "description" style = {{display:"block"}}> Description </Label>   
                    <ContentField type = "text" id = "description" value = {this.state.description}
                    
                    minRows = {5}
                    onChange = {this.onUpdateTextField}/>
                </div>

                <div>
                    <Label> Tag your Event </Label>
                    <Tags tags = {this.state.tags}/>

                    <TagForm onAddTag = {this.onTagAdded}/>
                </div>

                <Button onClick = {this.onEventSubmitted}style = {{width:"50%",marginLeft:"25%",marginTop:"2%", }}>
                        Post Event
                </Button>

            </Wrapper>
        )
    }
}