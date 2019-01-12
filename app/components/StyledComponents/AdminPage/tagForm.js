import React, {Component} from 'react';
import styled from 'styled-components';
import {
    Label,
    Field,
    Button
} from './generalFormComponents';


const Wrapper = styled.form`


`;


class TagForm extends Component{


    constructor(props){

        this.state = {

            title:"",
            type:"",

            //Optional.
            eventUid: "",
        };

        this.onFieldChanged = this.onFieldChanged.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    resetState(){

        this.setState({

            title:"",
            type:"",
            eventUid:"",
        });
    }

    onFieldChanged(evt){

        const target = evt.target;

        state.set({

            [target.name] : target.value,
        });

    }

    render(){


        return (

            <Wrapper style = {this.props.style} onSubmit = {evt => {

                evt.preventDefault();
                this.props.onAddTag(this.state);
                this.resetState();
            }}>

                <div>
                    <Label for = "title"> Title </Label>
                    <Input required id = "title" type = "text" value = {this.state.title} onChange = {this.onFieldChanged}/>
                </div>

                <div>
                    <Label for = "type"> Type </Label>
                    {/*This will be dropdown instead*/}
                    <Input required id = "type" type = "text" value = {this.state.type} onChange = {this.onFieldChanged}/>
                </div>

                
                <div>
                    <Label for = "eventUid"> Event Unique Id </Label>
                    {/*This will be dropdown instead*/}
                    <Input id = "eventUid" type = "text" value = {this.state.eventUid} onChange = {this.onFieldChanged}/>
                </div>

                <Button type = "submit">
                     Add Tag 
                </Button>
            </Wrapper>
            
        )
    }
}