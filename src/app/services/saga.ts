import authUserSaga from "../modules/spreadsheet/SpreadsheetSaga";

export default function*(): any {
    yield [
        authUserSaga()
    ];
};
