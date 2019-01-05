import React, {Component} from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
const ForwardImage = require('images/forward_96.png');
const BackwardImage = require('images/backward_96.png');

const CSSVariables = styled.div`

    --main-color: #1a8fff;
    --text-color: #777;
    --text-color-light: #ccc;
    --border-color: #eee;
    --bg-color: #f9f9f9;
    --neutral-color: #fff;
`;

const Wrapper = styled.div`

border:2px solid black;

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
  
`;



const Days = styled.div`

    
    display:flex;
    justify-content: space-evenly;
`;

const Day = styled.div`

    border:2px solid black;
    padding:5px;
`;

const Cells = styled.div`

    //Flex not REALLY NEEDED HERE.
    display:flex;
    flex-wrap: wrap;
    border-sizing: border-box;
    width:85%;
    margin:auto;
    align-self:center;
`;


//Could be percentage cause usually 5 weeks.
const Cell = styled.div`

    border:2px solid black;
    width:100px;
    height:100px;
`;

class Calendar extends Component{


    constructor(props){

        super(props);


        this.state = {

            currentMonth : new Date(),
            selectedDate : new Date(),
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
                <Day key = {i} >
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
                cells.push(<Cell key ={i}>

                        {dateFns.format(toShow, dateFormat)}
                
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