import * as React from "react";
import {Table} from "reactstrap";
import {cloneDeep, sortBy} from "lodash";
import TableCell from "./TableCell";
import selector from "../app/services/selector";
import {addTableColumn, addTableRow, getSpreadsheetData} from "../app/modules/spreadsheet/SpreadsheetActions";
import {connect} from "react-redux";
import {Iterable} from "immutable";


class Spreadsheet extends React.Component <any, any> {
    constructor(props: any) {
        super();
    }

    componentDidMount(): void {
        this.props.getSpreadsheetData();
    }

    renderTableRow(data) {
        return data.map((item, i) => {
            return  <TableCell key={i} data={item} />
        });
    }

    renderTableBodyRows(data, rowCount, columnCount) {
        return Array(rowCount - 1).fill("").map((item, i) => {
            return (
                <tr key={i}>
                    {this.renderTableRow(data.slice(i * columnCount, (i + 1) * columnCount ))}
                </tr>
            );
        });
    }
    addTableRow = (data, body) => {
        const types = body.slice(0, data.columnCount).reduce((acc, cell) => {
            return [...acc, cell.type];
        }, []);
        this.props.addTableRow({...data, types})
    };

    addTableColumn = (data, body) => {
        const types: Iterable<number, string> = body.slice(0, data.rowCount).reduce((acc, cell) => {
            return [...acc, cell.type];
        }, []);

        this.props.addTableColumn({...data, types});
    };

    render(): JSX.Element{
        const data = sortBy(this.props.tableCells.toJS(), ["row", "column"]);
        const lastRow = data.slice(-1)[0];
        const rowCount = lastRow ? lastRow.row + 1 : 0;
        const columnCount = lastRow ? lastRow.column + 1 : 0;
        const headers = data.slice(0, columnCount);
        const body = data.slice(columnCount);

        return (

            <div>
                <Table bordered>
                    <thead>
                        <tr>
                            {headers.map((item, i) => {
                                return  <TableCell key={i} data={item} />
                            })}
                            <td onClick = {()=> this.addTableColumn({ rowCount, columnCount }, body)}>+</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            body.length > 0 && this.renderTableBodyRows(body, rowCount, columnCount)
                        }
                        <tr>
                            <td onClick = {()=> this.addTableRow({columnCount, rowCount }, body)}>+</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => selector(state);

const mapDispatchToProps = dispatch => {
    return {
        getSpreadsheetData: () => dispatch(getSpreadsheetData()),
        addTableRow: data => dispatch(addTableRow(data)),
        addTableColumn: data => dispatch(addTableColumn(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Spreadsheet);
