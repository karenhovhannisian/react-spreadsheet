import {actions} from "./SpreadsheetReducer";

export function getSpreadsheetData() {
    return { type: actions.GET_SPREADSHEET_DATA };
}

export function getSpreadsheetDataSucceed(data) {
    return { type: actions.GET_SPREADSHEET_DATA_SUCCEED, payload: { data } };
}

export function getSpreadsheetDataFailed(data) {
    return { type: actions.GET_SPREADSHEET_DATA_FAILED, payload: { data } };
}

export function addTableRow(data) {
    return { type: actions.ADD_TABLE_ROW, payload: { data } };
}

export function addTableRowSucceed(data) {
    return { type: actions.ADD_TABLE_ROW_SUCCEED, payload: { data } };
}

export function addTableRowFailed(data) {
    return { type: actions.ADD_TABLE_ROW_FAILED, payload: { data } };
}

export function addTableColumn(data) {
    return { type: actions.ADD_TABLE_COLUMN, payload: { data } };
}

export function addTableColumnSucceed(data) {
    return { type: actions.ADD_TABLE_COLUMN_SUCCEED, payload: { data } };
}

export function addTableColumnFailed(data) {
    return { type: actions.ADD_TABLE_COLUMN_FAILED, payload: { data } };
}

export function updateCellContent(data) {
    return { type: actions.UPDATE_CELL_CONTENT, payload: { data } };
}

export function updateCellContentSucceed(data) {
    return { type: actions.UPDATE_CELL_CONTENT_SUCCEED, payload: { data } };
}

export function updateCellContentFailed(data) {
    return { type: actions.UPDATE_CELL_CONTENT_FAILED, payload: { data } };
}
