import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './../../style/FolderExplorerStyle.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/CommonStore';

class WorkspaceShortcut extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shortcut: this.props.shortcut,
            loaded: false,
            loading: false
        };

        this.handleClickTitle = this.handleClickTitle.bind(this);
        this.receivedCallback = this.receivedCallback.bind(this);
    }

    receivedCallback() {
        this.setState({
            loading: false
        });
    }

    handleClickTitle(event) {
        event.preventDefault();
        event.stopPropagation();

        this.props.setSelectedObjectFunction(this.state.shortcut);
    }

    render() {
        return (
            <div>
                <a href="#" onClick={this.handleClickTitle} className="explorerLink">
                    <i className="fa fa-link"></i> {" " + this.state.shortcut.name}
                    {this.state.loading ? <i className="fa fa-spinner fa-spin"></i> : []}
                </a>
            </div>
        );
    }
}

export default connect(
    state => state.commonStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(WorkspaceShortcut);