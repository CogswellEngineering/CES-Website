import React, {Component} from 'react';
import styled from 'styled-components';
import DatePicker from "react-datepicker"; 
import Dropzone from 'react-dropzone'
import {StyledLabel,ErrorMessage,StyledInput, StyledLink, ContentField} from 'components/StyledForm'

//I want to replace these with form compnents already have.
import {
    ThumbnailDropzone,
    Title
} from './generalFormComponents';
import TagForm from './tagForm';
import Tags from 'components/Tags';
import {Button} from 'components/General';


import "react-datepicker/dist/react-datepicker.css";

const Wrapper = styled.div`


    

`;


export default class EventPostForm extends Component{


    constructor(props){

        super(props);

        this.state = {

            //pdate event page to just concat thumbnail at start of gallery.
            thumbnail:null,
            thumbnailPreview:"",
            hostName:"",
            hostEmail:"",
            //In future there will be way to search for users, and that tool will be used to select the host
            //or this if host is not a user.
            hostUid:"",
            title:"",

            //Later make choose from drop down or other.
            type:"",
            description:"",
            //Prob object instead, just being lazy now, just string is okay, no need to separate
            //UNLESS HAVE FILTER FOR LOCATION, but that's later.
            location: "",
            //Find package for picking dates.
            startDate: new Date(),
            endDate: new Date(),
            //Optional
            tags:[],

            //Below still need to be added as fields, but low priority.
            agenda:[],
            gallery:[],

        };


        this.onEventSubmitted = this.onEventSubmitted.bind(this);
        this.onUpdateEventDate = this.onUpdateEventDate.bind(this);
        this.onThumbnailFieldUpdated = this.onThumbnailFieldUpdated.bind(this);
        this.onHostIconUpdated = this.onHostIconUpdated.bind(this);
        this.onUpdateTextField = this.onUpdateTextField.bind(this);
        this.onTagAdded = this.onTagAdded.bind(this);
        this.onTagRemoved = this.onTagRemoved.bind(this);
        this.resetState = this.resetState.bind(this);


    }

    


    componentWillUnmount(){

        if (this.state.thumbnail != null){

            window.URL.revokeObjectURL(this.state.thumbnailPreview);   
        }

        this.resetState();
    }

    resetState(){


        if (this.state.thumbnail != null){

            window.URL.revokeObjectURL(this.state.thumbnailPreview);
            
        }

        this.setState({

            //pdate event page to just concat thumbnail at start of gallery.
            thumbnail:null,
            thumbnailPreview: "",
            title:"",
            type:"",
            hostIcon:null,
            //Might seprate this into fields, if needed
            location:"",
            description:"",
            //Prob object instead, just being lazy now, just string is okay, no need to separate
            //UNLESS HAVE FILTER FOR LOCATION, but that's later.
            location: "",
            //Find package for picking dates.
            startDate:new Date(),
            endDate: new Date(),
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
                    window.URL.revokeObjectURL(state.thumbnailPreview);
            }

            const thumbnailPreview = window.URL.createObjectURL(acceptedFiles[0]);

            return {
                thumbnailPreview,
                thumbnail:acceptedFiles[0]
            }
        });
    }

    onHostIconUpdated = (acceptedFiles, rejectFiles) => {

        this.setState( state => {

            if (state.hostIcon != null){

                window.URL.revokedObjectURL(state.hostIcon);
            }

            return {
                hostIcon:acceptedFiles[0]
            }
        })
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



    //Been alternating arrows and not, honestly no real reason.
    onUpdateEventDate = (prefix,date) =>{


        //Need to add check for validity and
        //prob auto update end to start
        //when select start. Hmm
        //Maybe good to actually make these separate afterall due to differences
        //instead of adding processing with a check.
        //For now it's confiring saga working, but def needed add not just polish thing.
        this.setState({

            [prefix+"Date"]: date,
        });
    }


    onEventSubmitted = (evt) => {

        evt.preventDefault();
        console.log("state at submission", this.state);
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
                    
                    //Just noticed this actually recreates one every render.
                    <img style = {{width:"inherit",height:"inherit"}} src = {this.state.thumbnailPreview}/>
                :
                <p>Add A Thumbnail For Your Event</p>
                }
                </ThumbnailDropzone>
          )}
                </Dropzone>

                <div style = {{gridArea:"dateSelection", marginTop:"1%", width:"100%"}}>
                    <StyledLabel >  Select the Starting Date of your Event </StyledLabel>
                    <DatePicker

                            dateFormat="MMMM d, yyyy h:mmaa "
                            showTimeSelect
                            selected={this.state.startDate}
                            onChange={ (date) => {this.onUpdateEventDate("start",date);   } }
                        />
                </div>

                <div style = {{gridArea:"dateSelection", marginTop:"1%", width:"100%"}}>
                    <StyledLabel >  Select the Ending Date of your Event </StyledLabel>
                    <DatePicker
                            
                            dateFormat="MMMM d, yyyy h:mmaa"
                            showTimeSelect
                            selected={this.state.endDate}
                            onChange={ (date) => {this.onUpdateEventDate("end",date);   } }
                        />
                </div>

                <div>
                    <StyledLabel> Location </StyledLabel>
                    <StyledInput type = "text" id = "location" value = {this.state.location} onChange = {this.onUpdateTextField}/>


                </div>

                <div style = {{marginTop:"1%"}}>

                    <StyledLabel for = "title"> Title </StyledLabel>
                    <StyledInput type = "text" id = "title" value = {this.state.title} onChange = {this.onUpdateTextField}/>

                </div>

                
                <div  style = {{marginTop:"1%"}}>

                    <StyledLabel for = "type"> Type </StyledLabel>
                    <StyledInput type = "text" id = "type" value = {this.state.type} onChange = {this.onUpdateTextField}/>

                </div>

                <div  style = {{marginTop:"1%"}}>



                        <StyledLabel style = {{display:"block"}}> Host </StyledLabel> 


                        <Dropzone onDrop = {this.onHostIconUpdated}>
                        {({getRootProps, getInputProps}) => (

                            <ThumbnailDropzone {...getRootProps()}>
                                <input {...getInputProps()} />
                                {this.state.hostIcon?
                                    
                                    <img style = {{width:"inherit",height:"inherit"}} src = {window.URL.createObjectURL(this.state.hostIcon)}/>
                                :
                                <p>Add Host Icon For Your Event</p>
                                }
                            </ThumbnailDropzone>)}
                       </Dropzone>
                        <StyledLabel for = "hostName"> Name </StyledLabel>
                        <StyledInput type = "text" id = "hostName" value = {this.state.hostName} onChange = {this.onUpdateTextField}/>
                       
                        <StyledLabel for = "hostEmail"> Email </StyledLabel>
                        <StyledInput type = "email" id = "hostEmail" value = {this.state.hostEmail} onChange = {this.onUpdateTextField}/>
                        
                        <StyledLabel for = "hostUid"> Unique Id </StyledLabel>
                        <StyledInput type = "text" id = "hostUid" value = {this.state.hostUid} onChange = {this.onUpdateTextField}/>
                </div>

                <div>
                    <StyledLabel for = "description" style = {{display:"block"}}> Description </StyledLabel>   
                    <ContentField type = "text" id = "description" value = {this.state.description}
                    
                    minRows = {5}
                    onChange = {this.onUpdateTextField}/>
                </div>

                <div>
                    <StyledLabel  style = {{textAlign:"center", marginTop:"5%"}}> Tag your Event </StyledLabel>
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