import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/CommonStore';
import FolderView from './FolderView';
import DocumentView from './DocumentView';
import UserView from './UserView';
import DefaultPage from '../DafaultPage';

import _ from 'lodash';
import EmailView from './EmailView';
import WorkspaceShortcutView from './WorkspaceShortcutView';
import WorkspaceView from './WorkspaceView';

class ViewSelectedPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        if (!_.isEmpty(this.props.selectedObject)) {
            switch (this.props.selectedObject.wstype) {
                case "filingFolder": return (<div><FolderView key={this.props.selectedObject.folder_id} theObject={this.props.selectedObject} /></div>);
                case "folder": return (<div><FolderView key={this.props.selectedObject.folder_id} theObject={this.props.selectedObject} /></div>);
                case "document": return (<div><DocumentView key={this.props.selectedObject.document_id} theObject={this.props.selectedObject} /></div>);
                case "email": return (<div><EmailView key={this.props.selectedObject.id} theObject={this.props.selectedObject} /></div>);
                case "user": return (<div><UserView key={this.props.selectedObject.name} theObject={this.props.selectedObject} /></div>);
                case "workspace_shortcut": return (<div><WorkspaceShortcutView key={this.props.selectedObject.name} theObject={this.props.selectedObject} /></div>);
                case "workspace": return (<div><WorkspaceView key={this.props.selectedObject.name} theObject={this.props.selectedObject} /></div>);
                default: return (<div><DefaultPage /></div>);
            }
        }
        return (<div><DefaultPage /></div>);
    }
}

export default connect(
    state => state.commonStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ViewSelectedPanel);