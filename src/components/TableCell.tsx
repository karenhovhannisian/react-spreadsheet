import * as React from 'react';
import "font-awesome/css/font-awesome.css";
import { connect } from "react-redux";
import selector from '../app/services/selector';
import { updateCellContent } from '../app/modules/spreadsheet/SpreadsheetActions';

interface PassedProps extends React.Props<any> {
    data: any
}
class TableCell extends React.Component <any, any> {
    constructor(props: any){
        super();
        this.state = {
            editable: false,
            content: props.data.content
        }
    }

    edit = () => {
        this.setState({ editable: true })
    };

    save = () => {
        this.props.updateCellContent({ ...this.props.data, newContent: this.state.content})
        this.setState({ editable: false})
    };

    cancel = () => {
        this.setState({ editable: false, content: "" })
    };

    handleChange = (event) => {
        this.setState({content: event.target.value})
    };

    renderEditableItem() {
        const { data } = this.props;
        switch(data.type) {
            case 'text':
             return <input type="text" value={this.state.content} id={data.id} onChange={this.handleChange}/>
            case 'number':
             return <input type="number" value={this.state.content} id={data.id} onChange={this.handleChange}/>
            case 'select':
              return (
                  <select value={this.state.content} id={data.id} onChange={this.handleChange}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                  </select>
              )
        }
}

    render(): JSX.Element{

        return(
            <td>{this.state.editable ? (
                <span>
                    {this.renderEditableItem()}
                    <div style={{float: "right"}}>
                         <i className="fa fa-check" style={{ color: "green" }} onClick={this.save}> </i>
                         <i className="fa fa-times" style={{ color: "red" }} onClick={this.cancel}> </i>
                    </div>
                </span>
            ) : (
                <span>
                    {this.props.data.content}
                    {(this.props.data.column !==  3 || this.props.data.row ===0) &&
                    (<i className="fa fa-pencil" style={{float: "right", color: "green"}} onClick={this.edit}> </i>)}
                </span>
            )}
            </td>
        );
    }
}

const mapStateToProps = state => selector(state);

const mapDispatchToProps = dispatch => {
    return {
        updateCellContent: data => dispatch(updateCellContent(data)),
    };
};

export default connect<any, any, PassedProps>(mapStateToProps, mapDispatchToProps)(TableCell);
