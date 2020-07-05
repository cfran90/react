import React, {Component} from "react";
import DataTable from 'react-data-table-component';
import memoize from 'memoize-one';

export default class Datatable extends Component {

    actions = memoize(onclick => (
        <button variant="contained" color="primary" onClick={onclick}>Novo</button>
    ));

    // contextActions = memoize(onClickk => (
    //         <button id="edityar" variant="contained" color="primary" onClick={onClickk}>Editar</button>
    //
    // ));
    contextActions = (onClickk, onClick2) => (
        <button id="edityar" variant="contained" color="primary" onClick={onClickk}>Editar</button>

    );

    state = {
        selectedRows: [],
        toggledClearRows: false
    }

    // Toggle the state so React Table Table changes to `clearSelectedRows` are triggered
    handleClearRows = () => {
        this.setState({toggledClearRows: !this.state.toggledClearRows})
    }

    deleteOne = row => {
        if (window.confirm(`Are you sure you want to delete:\r ${row.name}?`)) {
            const {data} = this.state;
            const index = data.findIndex(r => r === row);

            this.setState(state => ({
                toggleCleared: !state.toggleCleared,
                data: [...state.data.slice(0, index), ...state.data.slice(index + 1)],
            }));
        }
    }

    deleteAll = () => {
        const {selectedRows} = this.state;
        const rows = selectedRows.map(r => r.name);
        if (window.confirm(`Are you sure you want to delete:\r ${rows}?`)) {
            // this.setState(state => ({ toggleCleared: !state.toggleCleared, data: differenceBy(state.data, state.selectedRows, 'title') }));
        }
    }

    render() {
        return (
            <>
                <DataTable
                    title="Usuários"
                    columns={this.props.columns}
                    data={this.props.data}
                    selectableRows // add for checkbox selection
                    fixedHeader
                    defaultSortField="name"
                    fixedHeaderScrollHeight="650px"
                    // actions={this.actions(this.deleteAll)}
                    // contextActions={this.contextActions(this.deleteAll, this.onClick2)}
                    onSelectedRowsChange={this.props.handleChange}
                    clearSelectedRows={this.state.toggledClearRows}
                />
            </>
        )
    }
};