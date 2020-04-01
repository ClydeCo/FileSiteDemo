import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/WorkspaceStore';

import Workspace from './Workspace'

import './../../style/FolderExplorerStyle.css';

class Workspaces extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showChildren: false,
            loading: false,
            loaded: false,
            libraryName: this.props.libraryName
        };

        this.handleClickTitle = this.handleClickTitle.bind(this);
        this.callBackFunction = this.callBackFunction.bind(this);
    }

    callBackFunction(workspaces) {
        this.setState({
            loading: false,
            loaded: true
        })
    }

    handleClickTitle(event) {
        event.preventDefault();
        event.stopPropagation();

        this.setState({
            showChildren: !this.state.showChildren
        });

        if (this.state.loaded) return;

        this.setState({
            loading: true
        });

        this.props.requestWorkspacesFunction(this.state.libraryName, this.callBackFunction);
    }

    render() {
        return (
            <div>
                <a href="#" onClick={this.handleClickTitle} className="explorerLink"><i className={this.state.showChildren ? "fa fa-briefcase" : "fa fa-briefcase"}></i> Workspaces
                    {this.state.loading ? <i className="fa fa-spinner fa-spin fa-2x"></i> : []}</a>

                <ul className="list-unstyled" style={{ display: this.state.showChildren ? "inherit" : "none" }}>
                    {this.props.workspaces.map(item =>
                        <li key={item.id}>
                            <Workspace key={item.id}
                                workspace={item}
                            />
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}


export default connect(
    state => state.workspaceStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Workspaces);