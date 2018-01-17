import {call, put, takeLatest} from "redux-saga/effects";
import * as Actions from "./SpreadsheetActions";
import {actions} from "./SpreadsheetReducer";
import * as Api from "../../../api/SpreadsheetApi";

export function* getSpreadsheetData() {
    try {
        const response = yield call(Api.getSpreadsheetData);
        yield put(Actions.getSpreadsheetDataSucceed(response.data));
    } catch ({ response: { data: { message } } }) {
        yield put(Actions.getSpreadsheetDataFailed({ message }));
    }
}

export function* addTableRow(action): any {
    try {
        const { columnCount, rowCount, types } = action.payload.data;
        const rowCells = [];
        Array(columnCount).fill("").map((item, index) => {
            rowCells.push({
                id: Math.floor(Math.random() * 10000000),
                row: rowCount,
                column: index,
                type: types[index],
                content: ""
            });
        });
        // todo: send to backend to add to database
        yield put(Actions.addTableRowSucceed(rowCells));
    }catch( { response: { data: { message } } }) {
        yield put(Actions.addTableRowFailed({ message }));
    }
}

export function* addTableColumn(action): any {
    try {
        const { columnCount, rowCount, types } = action.payload.data;
        const columnCells = [];
        Array(rowCount).fill("").map((item, index) => {
            columnCells.push({
                id: Math.floor(Math.random() * 10000000),
                row: index,
                column: columnCount,
                type: types[index],
                content: ""
            });
        });
        // todo: send to backend to add to database
        yield put(Actions.addTableColumnSucceed(columnCells));
    }catch( { response: { data: { message } } }) {
        yield put(Actions.addTableColumnFailed({ message }));
    }
}

export function* updateCellContent(action): any {
    try {
        // todo: send to backend to update the database
        yield put(Actions.updateCellContentSucceed(action.payload.data));
    }catch( { response: { data: { message } } }) {
        yield put(Actions.updateCellContentFailed({ message }));
    }
}

function* spreadsheetSaga() {
    yield takeLatest(actions.GET_SPREADSHEET_DATA, getSpreadsheetData);
    yield takeLatest(actions.ADD_TABLE_ROW, addTableRow);
    yield takeLatest(actions.ADD_TABLE_COLUMN, addTableColumn);
    yield takeLatest(actions.UPDATE_CELL_CONTENT, updateCellContent);
}

export default spreadsheetSaga;
