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

//Fuck it this is fine, will just do media stuff later to make responsive.
const Wrapper = styled.div`

    color: rgb(243, 161, 1);
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
    width:80%;
    margin:auto;
`;



const Days = styled.div`

    margin:auto;
    text-align:center;
`;

const Day = styled.div`

    width:100px;
    display:inline-block;
`;

const Cells = styled.div`

    display:flex;
    flex-wrap: wrap;
    border-sizing: border-box;
    width:85%;
    height:100%;
    margin:auto;
    justify-content: center;
    color:black;
    font-weight:bold;
`;


//Could be percentage cause usually 5 weeks.
const Cell = styled.div`

    border-left :1px solid black;
    border-bottom:1px solid black;
    border-right: ${props => props.dayNumber == 6? "1px solid black" : ""};
    width:100px;
    height:100px;
    background-color: ${props => props.color};
    cursor: pointer;
`;



//Will prob do this as same as usual calendars
const EventFlags = styled.div`
   
    width:100%;
`;
const EventFlag = styled.div`

    background-color: ${props => props.color};
    height: ${props => props.title? "auto" : "15px"};
    font-size:10px;
    width:100%;
    margin-top:1%;
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
        this.onEventClicked = this.onEventClicked.bind(this);
        this.onCellClicked = this.onCellClicked.bind(this);
    }

    onCellClicked(evt){

        console.log("I happen", evt.target);
        const date = evt.target.id

        if (dateFns.isEqual(this.state.selectedDate,date)){

            this.setState({
                selectedDate: null
            });
        }
        else{
            this.setState({

                selectedDate : date
            });
        }


    }

    onEventClicked(evt) {


        evt.persist();
        console.log("target", evt.target);
        //Problem is it's not adding anything new attribute
        const eventId = evt.target.id.split("_");
        console.log("split ", eventId);
        
        //Then this is also happening

        //Then pull corresponding event.
        const {events, onSelectEvent} = this.props;

        for (var i = 0; i < events.length; ++i){

            console.log("current event looking at ", events[i]);

            if (events[i].title === eventId[0] && dateFns.isSameDay(events[i].startDate, eventId[1])){
                console.log("But I don't happen during this part");
                onSelectEvent(events[i]);
            }
        }


    }

    
    nextMonth(){

        this.setState( state => {

            const currentMonth = dateFns.addMonths(state.currentMonth, 1);
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
        const {events, onSelectEvent} = this.props;
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

                var colorOfCell = "white";

                if (dateFns.isEqual(selectedDate, toShow)){
                    colorOfCell = "green";
                }
                else if (dateFns.isToday(toShow)){
                    colorOfCell = "rgb(36, 154, 29)";
                }
                else if (!dateFns.isSameMonth(toShow, currentMonth))
                {
                    colorOfCell = "gray";
                }
                cells.push(<Cell key ={toShow} dayNumber = {i} onClick = {this.onCellClicked}  id ={toShow}
                color = {colorOfCell}>

                        {dateFns.format(toShow, dateFormat)}
                        <EventFlags>

                            {
                                events.map( event => {

                                    var innerHtml = "";
                                    
                                    if (dateFns.isSameDay(event.startDate, toShow)){

                                        innerHtml = event.title;

                                        const {type, title} = event;
                                        //Class is for onclick events
                                        return <EventFlag key = {event.title+toShow} color = {this.eventColors[type]} title = {innerHtml} id = {title + "_" +  event.startDate}
                                        onClick = {this.onEventClicked}
                                        >
                                         {innerHtml} </EventFlag>
                                    }
                                    else if (dateFns.isWithinRange(toShow, event.startDate, event.endDate)){
                                       
                                        const {type, title} = event;
                                        //Class is for onclick events
                                        return <EventFlag key = {event.title+toShow} color = {this.eventColors[type]} id = {title + "_" +  event.startDate}
                                        onClick = {this.onEventClicked}
                                        />
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