import {createSelector} from 'reselect';

//Probably should rename these, since not everything using this for is form field
//Like make select field literally works on anything in state.
export default class GenericFormSelectors{
    
    constructor(page){
        this.selectState = (state) => state.get(page);
        this.makeSelectField = this.makeSelectField.bind(this);
        this.makeSelectError = this.makeSelectError.bind(this);

    }

    //Prob should rename 

    makeSelectField = (fieldName) => createSelector(
        this.selectState,
        (state) => {
            //Oh it's cause of this.
            if (state == null) return ""

            return state.get(fieldName);
        }
    );

    makeSelectDone = (flagName) => createSelector(

        this.selectState,
        (state) => {
            if (state == null) return false;

            return state.get(flagName);
        }

    )

    makeSelectError = () => createSelector(
        this.selectState,
        (state) => {

            if (state){
                return state.get("error");
            }
            else{
                return "";
            }
        }
    )
}