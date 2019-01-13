import React, {Component} from 'react';
import styled from 'styled-components';
import {
    Label,
    Field,
    Button
} from './generalFormComponents';


const Wrapper = styled.form`

    border: 1px solid black;
    display:flex;

`;


export default class TagForm extends Component{


    constructor(props){

        super(props);

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

        console.log("I am called", target);
        this.setState({

            [target.id] : target.value,
        });

    }

    render(){


        return (

            <Wrapper style = {this.props.style} onSubmit = { (evt) => {

                evt.preventDefault();
                this.props.onAddTag(this.state);
                this.resetState();
            }} >

                <div>
                    <Label for = "title"> Title </Label>
                    <Field required id = "title" type = "text" value = {this.state.title} onChange = {this.onFieldChanged}/>
                </div>

                <div>
                    <Label for = "type"> Type </Label>
                    {/*This will be dropdown instead*/}
                    <Field required id = "type" type = "text" value = {this.state.type} onChange = {this.onFieldChanged}/>
                </div>

                
                <div>
                    <Label for = "eventUid"> Event Unique Id </Label>
                    {/*This will be dropdown instead*/}
                    <Field id = "eventUid" type = "text" value = {this.state.eventUid} onChange = {this.onFieldChanged}/>
                </div>

                <Button type = "submit"  style = {{width:"100px"}}>
                     Add Tag 
                </Button>
            </Wrapper>
            
        )
    }
}