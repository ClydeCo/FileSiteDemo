import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './../../style/FolderExplorerStyle.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/FolderStore';
import FolderContents from './FolderContents';

class Folder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            folderName: this.props.folderName,
            folderData: this.props.folderData,
            showChildren: false,
            folderId: this.props.folderId,
            loaded: false,
            loading: false
        };

        this.handleClickTitle = this.handleClickTitle.bind(this);
        this.receivedCallback = this.receivedCallback.bind(this);
        this.ensureDataFetched = this.ensureDataFetched.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let updatedFolder = nextProps.folders.filter(f => f.folder_id == this.state.folderData.folder_id)[0];
        //console.log(JSON.stringify(updatedFolder, null, 2));
        this.setState({
            folderData: updatedFolder,
            //showChildren: updatedFolder.isOpen
        });
    }

    receivedCallback(documents) {
        this.setState({
            loading: false,
            loaded: true
        });
    }

    ensureDataFetched() {
        this.setState({ loading: true, loaded: true });
        this.props.requestFolderChildrenFunction(this.state.folderId, this.state.folderData.database, this.receivedCallback);

        //this.setState({ loading: true });
        //this.props.requestFolderDocumentsFunction(this.state.folderId, this.state.folderData.database, this.receivedCallback);
    }

    handleClickTitle(event) {
        event.preventDefault();
        event.stopPropagation();

        this.props.setSelectedObjectFunction(this.state.folderData);

        this.setState({
            showChildren: !this.state.showChildren
        });

        if (this.state.loaded) return;

        this.setState({
            loading: true
        });

        this.ensureDataFetched();
    }

    render() {
        return (
            <div>
                <div className="hoverLi">
                    <a href="#" onClick={this.handleClickTitle} className="explorerLink">
                        <i className={this.state.showChildren ? "fa fa-folder-open" : "fa fa-folder"}></i>
                        {" " + this.state.folderName}
                        {this.state.loading ? <i className="fa fa-spinner fa-spin fa-2x"></i> : []}
                    </a>
                </div>
                <div>
                    <div style={{ display: this.state.showChildren ? "inherit" : "none" }}>
                        <FolderContents folderId={this.state.folderId} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => state.folderStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Folder);