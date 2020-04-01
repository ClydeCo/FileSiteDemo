import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './../../style/FolderExplorerStyle.css';

import Folder from './Folder';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/FolderStore';

class Workspace extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workspace: this.props.workspace,
            showChildren: false,
            loading: false,
            loaded: false
        };

        this.handleClickTitle = this.handleClickTitle.bind(this);
        this.callBackFunction = this.callBackFunction.bind(this);
    }

    callBackFunction(workspaceChildren) {
        this.setState({
            loading: false,
            loaded: true
        })
    }

    handleClickTitle(event) {
        event.preventDefault();
        event.stopPropagation();

        this.props.setSelectedObjectFunction(this.state.workspace);

        this.setState({
            showChildren: !this.state.showChildren
        });

        if (this.state.loaded) return;

        this.setState({
            loading: true,
        })

        this.props.requestWorkspaceChildrenFunction(this.state.workspace.id, this.state.workspace.database, this.callBackFunction);
    }

    render() {
        return (
            <div>
                <a href="#" onClick={this.handleClickTitle} className="explorerLink">
                    <i className={this.state.showChildren ? "fa fa-folder-open" : "fa fa-folder"}></i>
                    {" " + this.state.workspace.name}
                    {this.state.loading ? <i className="fa fa-spinner fa-spin fa-2x"></i> : []}
                </a>

                <ul className="list-unstyled" style={{ display: this.state.showChildren ? "inherit" : "none" }}>
                    {this.props.folders.filter(f => f.parent_id === this.state.workspace.id).map(item =>
                        <li key={item.id}>
                            <Folder key={item.id}
                                folderName={item.name}
                                folderId={item.id}
                                folderData={item}
                            />
                        </li>
                    )}
                </ul>
            </div >
        );
    }
}


export default connect(
    state => state.folderStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Workspace);