import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/CommonStore';

import _ from 'lodash';
import CustomModal from '../CustomModal';
import { getIcon, bytesToSize } from '../../scripts/CommonFunctions';

class FolderView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            deleting: false,
            theObject: { ...this.props.theObject },
            showModal: false
        };

        this.handleUpdateToggleClick = this.handleUpdateToggleClick.bind(this);
        this.handleDeleteToggleClick = this.handleDeleteToggleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleConfirmChanges = this.handleConfirmChanges.bind(this);
        this.handleConfirmDeletion = this.handleConfirmDeletion.bind(this);
        this.updateCallbackFunction = this.updateCallbackFunction.bind(this);
        this.deleteCallbackFunction = this.deleteCallbackFunction.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ theObject: nextProps.theObject });
    }

    handleUpdateToggleClick() {
        this.setState({
            editing: !this.state.editing,
            theObject: { ...this.props.theObject }
        });
    }

    handleDeleteToggleClick() {
        this.setState({
            deleting: true
        });
    }

    handleInputChange(e) {
        this.setState({
            theObject: { ...this.state.theObject, [e.target.id]: e.target.value }
        });
    }

    updateCallbackFunction(object) {
        this.setState({
            editing: false,
            theObject: { ...this.props.theObject }
        });
    }

    deleteCallbackFunction(object) {
        this.setState({
            theObject: {}
        });
    }

    handleConfirmChanges() {
        this.props.requestFolderUpdateFunction(this.state.theObject.folder_id, this.state.theObject, this.updateCallbackFunction);

        this.setState({
            showModal: false
        });
    }

    handleConfirmDeletion() {
        this.props.requestFolderDeleteFunction(this.state.theObject.folder_id, this.state.theObject, this.callbackFunction);

        this.setState({
            deleting: false
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="row text-center">
                        <h2><i className="fa fa-folder"></i> {this.state.theObject.name}</h2>
                    </div>
                    <div className="row">
                        <a href="#" className="stripped hover-icon" style={{ marginLeft: "16px" }} onClick={this.handleUpdateToggleClick}><i className="fa fa-pencil fa-lg"></i> </a>
                        <a href="#" className="stripped hover-icon" style={{ marginLeft: "16px" }} onClick={this.handleDeleteToggleClick}><i className="fa fa-trash fa-lg"></i> </a>
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                </div>
                                <div className="card-body">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Field</th>
                                                <th>Data</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(this.state.theObject).map(key =>
                                                <tr key={key}>
                                                    <td>{key}</td>
                                                    <td>
                                                        {this.state.editing ?
                                                            <input
                                                                className="form-control"
                                                                id={key}
                                                                value={this.state.theObject[key]}
                                                                onChange={e => this.handleInputChange(e)} /> :
                                                            this.state.theObject[key]}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {this.state.editing ?
                                <button className="btn btn-success" onClick={() => this.setState({ showModal: true })}>Confirm Changes</button> :
                                ""}
                        </div>
                    </div>
                </div>
                <CustomModal
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                    onConfirm={this.handleConfirmChanges}
                    modalTitle="Confirm Changes to Folder"
                    bodyTitle="Changes"
                    bodyText="Your changes will be made to the filesite server. Do you wish to confirm?"
                />
                <CustomModal
                    show={this.state.deleting}
                    onHide={() => this.setState({ deleting: false })}
                    onConfirm={this.handleConfirmDeletion}
                    modalTitle="Are You Sure?"
                    bodyTitle="Will Delete..."
                    bodyText={"This will delete the following folder AND all of its children folders and documents therein: " + this.state.theObject.name}
                />
            </div>
        )
    }
}

export default connect(
    state => state.commonStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(FolderView);