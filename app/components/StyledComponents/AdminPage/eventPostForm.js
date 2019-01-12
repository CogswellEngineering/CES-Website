import React, {Component} from 'react';
import styled from 'styled-components';
import DatePicker from "react-datepicker"; 

import {
    Label,
    Field,
    ThumbnailDropzone,
    Button,
} from './generalFormComponents';
import TagForm from './tagForm';


import "react-datepicker/dist/react-datepicker.css";

const Wrapper = styled.form`


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
        this.onThumbnailField = this.onThumbnailField.bind(this);
        this.onUpdateTextField = this.onUpdateTextField.bind(this);
        this.onTagAdded = this.onTagAdded.bind(this);
        this.onTagRemoved = this.onTagRemoved.bind(this);
        this.resetState = this.resetState.bind(this);


    }


    resetState(){

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



    //Been alternating arrows and not, honestly no real reason.
    onUpdateEventDate = (date) =>{

        this.setState({

            eventDate: date,
        });
    }


    onEventSubmitted = (evt) => {

        evt.preventDefault();

        this.props.onEventSubmitted(this.state);
        this.resetState();
    }



    render(){


        return (
            <Wrapper onSubmit = {this.onEventSubmitted}>

                <div>
                    <Label> Select the Date of your Event </Label>
                    <DatePicker
                            selected={this.state.eventDate}
                            onChange={this.handleChange}
                        />
                </div>

                <div>
                    <ThumbnailDropzone id = "thumbnail">

                        <Label for = "thumbnail"> Upload thumbnail </Label>

                    </ThumbnailDropzone>
                </div>

                <div>

                    <Label for = "title"> Title </Label>
                    <Input type = "text" id = "title" value = {this.state.title} onChange = {this.onUpdateTextField}/>

                </div>

                <div>
                    <Label for = "description"> Description </Label>   
                    <ContentField type = "text" id = "description" value = {this.state.description} onChange = {this.onUpdateTextField}/>
                </div>

                <div>
                    <Label> Tag your Event </Label>
                    <TagForm onAddTag = {this.onTagAdded}/>
                </div>

                <Button type = "submit"/>

            </Wrapper>
        )
    }
}