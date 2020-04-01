import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/DocumentStore';

import _ from 'lodash';
import CustomModal from '../CustomModal';
import PdfPreview from './previewers/PdfPreview';
import { getIcon, bytesToSize } from '../../scripts/CommonFunctions';

class DocumentView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            deleting: false,
            theObject: { ...this.props.theObject },
            showModal: false,
            caching: false,
            cached: false
        };

        this.handleUpdateToggleClick = this.handleUpdateToggleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleConfirmChanges = this.handleConfirmChanges.bind(this);
        this.handleDownloadClick = this.handleDownloadClick.bind(this);
        this.callbackFunction = this.callbackFunction.bind(this);
        this.deleteCallbackFunction = this.deleteCallbackFunction.bind(this);
        this.handleConfirmDeletion = this.handleConfirmDeletion.bind(this);
        this.handleDeleteToggleClick = this.handleDeleteToggleClick.bind(this);
        this.autoCacheDocumentIfSmall = this.autoCacheDocumentIfSmall.bind(this);
        this.afterCachingCallback = this.afterCachingCallback.bind(this);
        this.componentWillReceivePropsCallBack = this.componentWillReceivePropsCallBack.bind(this);
    }

    componentDidMount() {
        this.autoCacheDocumentIfSmall();
    }

    componentWillReceivePropsCallBack() {
        if (this.props.loadedDocId !== this.state.theObject.id && !this.state.caching) {
            this.setState({
                caching: false,
                cached: false
            });
            this.autoCacheDocumentIfSmall();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ theObject: nextProps.theObject }, this.componentWillReceivePropsCallBack);
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

    autoCacheDocumentIfSmall() {
        this.setState({
            caching: true
        });

        this.props.requestCacheDocumentFunction(
            this.state.theObject.database,
            this.state.theObject.id,
            this.state.theObject.name,
            this.state.theObject.extension,
            this.afterCachingCallback);
    }

    afterCachingCallback() {
        this.setState({
            caching: false,
            cached: true
        });
    }

    handleDownloadClick() {
        this.props.requestDownloadDocumentFunction(
            this.state.theObject.database,
            this.state.theObject.id,
            this.state.theObject.name,
            this.state.theObject.extension,
            () => console.log("Downloaded!"));
    }


    handleInputChange(e) {
        this.setState({
            theObject: { ...this.state.theObject, [e.target.id]: e.target.value }
        });
    }

    callbackFunction(object) {
        this.setState({
            editing: false,
            theObject: { ...this.props.theObject }
        });
    }

    handleConfirmChanges() {
        this.props.requestFolderUpdateFunction(this.state.theObject.document_id, this.state.theObject, this.callbackFunction);

        this.setState({
            showModal: false
        });
    }

    deleteCallbackFunction(object) {
        this.setState({
            theObject: {}
        });
    }

    handleConfirmDeletion() {
        this.props.requestDocumentDeleteFunction(this.state.theObject.document_id, this.state.theObject, this.deleteCallbackFunction);

        this.setState({
            deleting: false
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="row text-center">
                        <h2>
                            {" " + this.state.theObject.name}
                        </h2>
                        <br />
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <i className={getIcon(this.state.theObject.type) + " fa-lg"}></i>
                            <em>{bytesToSize(this.state.theObject.size)} </em>
                            <a href="#" className="stripped hover-icon" style={{ marginLeft: "16px" }} onClick={this.handleDownloadClick}><i className="fa fa-download fa-lg"></i> </a>
                            <a href="#" className="stripped hover-icon" style={{ marginLeft: "16px" }} onClick={this.handleUpdateToggleClick}><i className="fa fa-pencil fa-lg"></i> </a>
                            <a href="#" className="stripped hover-icon" style={{ marginLeft: "16px" }} onClick={this.handleDeleteToggleClick}><i className="fa fa-trash fa-lg"></i> </a>

                            {this.state.caching ? "Caching the document now. " : ""}
                            {this.state.cached ? <PdfPreview /> : ""}

                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                    </div>
                                    <div className="card-body">
                                        <div className="alert alert-warning" style={this.state.theObject.size > 1000000 ? { display: "block" } : { display: "none" }} role="alert">
                                            Warning: This is a large file and will take a bit to download if you have medieval internet.
                                        </div>
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
                    bodyText={"This will delete the following document: " + this.state.theObject.name}
                />
            </div>
        )
    }
}

export default connect(
    state => state.documentStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(DocumentView);