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
        (loginState) => {
            if (loginState == null) return ""

            return loginState.get(fieldName);
        }
    );

    makeSelectError = () => createSelector(
        this.selectState,
        (loginState) => {

            if (loginState){
                return loginState.get("error");
            }
            else{
                return "";
            }
        }
    )
}