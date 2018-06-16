import {createSelector} from 'reselect';

export default class GenericFormSelectors{
    
    constructor(page){
        this.selectState = (state) => state.get(page);
        this.makeSelectField = this.makeSelectField.bind(this);
        this.makeSelectError = this.makeSelectError.bind(this);

    }

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