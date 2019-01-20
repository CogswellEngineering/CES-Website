import styled from 'styled-components';
import media from 'theme/media';
import Tags from 'component/Tags';
import {StyledLink} from 'components/StyledForm';
//I want the cards to display:
/*
    Name
    Major Year? Prob same line here.
    Concentrations //Prob take up at most 2 lines.
    profile Picture 
    //Whole card will be clickable.
*/
const Wrapper = styled.div`


    display:grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
    "profilePicture name"
    "profilePicture status"
    "profilePicture concentrations";
`;

const ProfilePicture = styled.div`

    cursor:pointer;
    cursor:pointer;
    grid-area:profilePicture;
    background-image: url(${props => props.image});
    background-size: 100% 100%;
    background-position:center;
    background-repeat: no-repeat;
    border-radius: 50px;
`;

//Prob doesn't have to be own thing.
//CHanged to styled Link
const Name = styled(StyledLink)`

    grid-area:name;
`;

const Status = styled.div`

    grid-area:status;
    display:flex;
    justify-content:space-between;

`;


//Concentrations will be tags.
//Unlike events there' won't be event cards, since only difference is events and news which are collections
//no other extra info, except for Bio. hmm
export default const UserCard = props => {

    const {uid, profilePicture, name, major, year, concentrations, onClick, onClickConcentration} = props;


    return (<Wrapper >

            <ProfilePicture image = {profilePicture} onClick = {onClick}/>
            <Name onClick = {onClick}> {name} </Name>

            <Status>
                {/*maybe major and year also filter? Hmm.*/}
                <p> {major} </p>
                <p> {year} </p>
            </Status>

            <Tags tags = {concentrations} onTagClicked = {onClickConcentration} style = {{gridArea:"concentrations"}}/>
        
        </Wrapper>)
}