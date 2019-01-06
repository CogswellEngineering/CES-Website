import React, {Component} from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
const ForwardImage = require('images/forward_96.png');
const BackwardImage = require('images/backward_96.png');

//Could pass in prop here then others just use css variables.
//That's polish though
//for now will just put actual colors directly probably.
const CSSVariables = styled.div`

    --main-color: #1a8fff;
    --text-color: #777;
    --text-color-light: #ccc;
    --border-color: #eee;
    --bg-color: #f9f9f9;
    --neutral-color: #fff;
`;

const Wrapper = styled.div`

    //border:2px solid black;
    height:80%;
`;

const DirectionalButton = styled.div`

    background-image: url(${props => props.image});
    background-position:center;
    background-size: contain;
    width:64px;
    height:64px;
    cursor:pointer;

`;

const HeaderTitle = styled.p`

    text-align:center;
`;

const Header = styled.div`

    display:flex;
    justify-content:space-between;
    width:85%;
    margin:auto;
  
`;



const Days = styled.div`

    
    display:flex;
    margin:auto;
    width:85%;
    justify-content: center;
    text-align:center;
`;

const Day = styled.div`

    border:2px solid black;
    border-right: ${props => props.dayNumber == 6? "2px solid black" : "0px"};
    width:100px;
`;

const Cells = styled.div`

    display:flex;
    flex-wrap: wrap;
    border-sizing: border-box;
    width:85%;
    margin:auto;
    justify-content: center;
    text-align:right;
`;


//Could be percentage cause usually 5 weeks.
const Cell = styled.div`

    border-left :2px solid black;
    border-bottom:2px solid black;
    border-right: ${props => props.dayNumber == 6? "2px solid black" : ""};
    width:100px;
    height:100px;
    
    position:relative;
`;



//Will prob do this as same as usual calendars
const EventFlags = styled.div`
   
    position:absolute;
    bottom:0;
    width:100%;
`;
const EventFlag = styled.div`

    background-color: ${props => props.color};
    height: ${props => props.title? "auto" : "15px"};
    font-size:10px;
    width:100%;
    cursor: pointer;
`;

class Calendar extends Component{


    constructor(props){

        super(props);


        this.state = {

            currentMonth : new Date(),
            selectedDate : new Date(),
          
        };

        this.eventColors = {

            Hackathon: "rgb(254, 160, 13)",
            Competition: "rgb(36, 154, 29)",
        };
        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
    }

    
    nextMonth(){

        this.setState( state => {

            const currentMonth = dateFns.addMonths(state.currentMonth, 1);
            console.log("current Month", currentMonth);
            return {
                currentMonth: currentMonth
            };
        })
    }

    prevMonth(){

        this.setState( state => {

            const currentMonth = dateFns.subMonths(state.currentMonth,1);

            return {

                currentMonth: currentMonth
            };
        })
    }





    renderHeader(){

        const headerFormat = "MMMM YYYY";

        return (<Header>

                <DirectionalButton image = {BackwardImage} onClick = {this.prevMonth}/>

                    <HeaderTitle> { dateFns.format(this.state.currentMonth, headerFormat)}</HeaderTitle>
                <DirectionalButton image = {ForwardImage} onClick = {this.nextMonth}/>
            
            </Header>)

    }
    renderDays(){


        const dateFormat = "dddd";

        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);


        for (var i = 0; i < 7; ++i){

            const day = dateFns.addDays(startDate,i);
            days.push(
                <Day key = {i} dayNumber = {i}  >
                    {dateFns.format(day, dateFormat)}
                </Day>
            )
        }

        return <Days> {days} </Days>
    }


    renderCells(){

        //So to render cells of calendar, I want to go from start of month, to end of month date.
        //then within that go through the numbers.

        const {currentMonth, selectedDate} = this.state;
        const {events} = this.props;
        //Get start of month and end of month of current date.
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);

        //Then get first day of first week of month and last day of last week of month.
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";

        const cells = [];

        var day = startDate;

        while (day < endDate){

            //Then loop for seven days.

            for (var i = 0; i < 7; ++i){

                const toShow = dateFns.addDays(day,i);
                cells.push(<Cell key ={toShow} dayNumber = {i}>

                        {dateFns.format(toShow, dateFormat)}
                        <EventFlags>

                            {
                                events.map( event => {

                                    var title = null;
                                    console.log("event", event);
                                    //Does the visual.. but now onclick??
                                    if (dateFns.isWithinRange(toShow, event.startDate, event.endDate)){

                                        if (dateFns.isEqual(event.startDate, toShow)){
                                            title = event.title;
                                        }
                                        //Id is for onclick events
                                        return <EventFlag key = {event.title+toShow} id = {event.title} color = {this.eventColors[event.type]} title = {title}> {title} </EventFlag>
                                    }
                                    else{
                                        return null;
                                    }
                                })
                            }

                        </EventFlags>

                    
                </Cell>);
            }

            day = dateFns.addWeeks(day,1);
        }

        return (<Cells>
            

            {cells}
            </Cells>)

    }

    render(){


        return (
            <Wrapper style = {this.props.style}>

            {this.renderHeader()}
            {this.renderDays()}
            {this.renderCells()}

            </Wrapper>
        )
    }
}

export default Calendar;