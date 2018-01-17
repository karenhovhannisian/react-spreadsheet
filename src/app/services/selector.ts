import SpreadsheetSelector from "../modules/spreadsheet/SpreadsheetSelector";

export default (state, all = true, modules = []) => {
    if (all) {
        return {
            ...SpreadsheetSelector(state)
        };
    }

    let stateInProps: any = {};

    if (modules.includes("spreadsheet-data")) {
        stateInProps = Object.assign({}, stateInProps, {...SpreadsheetSelector(state)});
    }

    return stateInProps;
};
