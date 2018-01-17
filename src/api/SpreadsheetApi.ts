import axios, {AxiosPromise} from "axios";
import urls from "configs/urls";

export function getSpreadsheetData(): AxiosPromise {

    return axios.request({
        url: `${urls.apiUrl}/spreadsheet`,
        method: "GET",
        headers: {
        "Accept": "application/json",
            "Content-Type": "application/json",
        }
    });
}

