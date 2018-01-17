import {createSelector} from "reselect";
import {Map} from "immutable";

const spreadsheetSelector: any = (state: Map<string, any>) => state.get("spreadsheetData");

const tableCellsSelector: any = createSelector(
    spreadsheetSelector, (spreadsheetData: Map<string, any>) => spreadsheetData.get("tableCells")
);

const errorsSelector: any = createSelector(
    tableCellsSelector, (spreadsheetData: Map<string, any>) => spreadsheetData.get("errors")
);


export default state => {
    return {
        tableCells: tableCellsSelector(state),
        errors: errorsSelector(state)
    };
};
