import {fromJS, List, Map} from "immutable";

export const actions = {

    CLEAR: "CLEAR",

    GET_SPREADSHEET_DATA: 'GET_SPREADSHEET_DATA',
    GET_SPREADSHEET_DATA_SUCCEED: 'GET_SPREADSHEET_DATA_SUCCEED',
    GET_SPREADSHEET_DATA_FAILED: 'GET_SPREADSHEET_DATA_FAILED',

    ADD_TABLE_ROW: 'ADD_TABLE_ROW',
    ADD_TABLE_ROW_SUCCEED: 'ADD_TABLE_ROW_SUCCEED',
    ADD_TABLE_ROW_FAILED: 'ADD_TABLE_ROW_FAILED',

    ADD_TABLE_COLUMN: 'ADD_TABLE_COLUMN',
    ADD_TABLE_COLUMN_SUCCEED: 'ADD_TABLE_COLUMN_SUCCEED',
    ADD_TABLE_COLUMN_FAILED: 'ADD_TABLE_COLUMN_FAILED',

    UPDATE_CELL_CONTENT: 'UPDATE_CELL_CONTENT',
    UPDATE_CELL_CONTENT_SUCCEED: 'UPDATE_CELL_CONTENT_SUCCEED',
    UPDATE_CELL_CONTENT_FAILED: 'UPDATE_CELL_CONTENT_FAILED',
};

const defaultState = fromJS({
    tableCells: [],
    errors: ''
});

export default (state = defaultState, {type, payload}) => {
    switch (type) {
        case actions.CLEAR:
            return state
                .set("tableCells", List());

        case actions.GET_SPREADSHEET_DATA_SUCCEED:
            return state
                .set('tableCells', fromJS(payload.data))
                .set('errors', '');

        case actions.GET_SPREADSHEET_DATA_FAILED:
            return state
                .set('errors', payload.data.message);

        case actions.ADD_TABLE_ROW_SUCCEED:
            return state.update("tableCells", cells => {
                return cells.concat(fromJS(payload.data));
            });

        case actions.ADD_TABLE_COLUMN_SUCCEED:
            return state.update("tableCells", cells => {
                return cells.concat(fromJS(payload.data));
            });

        case actions.UPDATE_CELL_CONTENT_SUCCEED:
            return state.update("tableCells", cells => {
                return cells.map(cell => {
                    if(cell.get("id") == payload.data.id) {
                        return cell.set("content", payload.data.newContent)
                    } else if((payload.data.column == 1 || payload.data.column == 2) && cell.get("column") == 3 && payload.data.row == cell.get("row")) {
                        return cell.update("content", content => {
                            return Number(content) + Number(payload.data.newContent) - Number(payload.data.content)
                        })
                    } else {
                        return cell;
                    }
                })
            });

        default:
            return state;
    }
};
