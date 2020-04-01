import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/CommonStore';

import { getIcon } from '../../scripts/CommonFunctions';

import _ from 'lodash';

import './../../style/FolderExplorerStyle.css';


class Document extends Component {
    constructor(props) {
        super(props);

        this.state = {
            documentData: this.props.documentData
        };

        this.handleClickTitle = this.handleClickTitle.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            documentData: nextProps.documentData
        });
    }

    handleClickTitle(event) {
        event.preventDefault();
        event.stopPropagation();

        this.props.setSelectedObjectFunction(this.state.documentData);
    }

    render() {
        return (
            <div>
                <a href="#" onClick={this.handleClickTitle}
                    className={!_.isEmpty(this.props.selectedObject) && _.eq(this.props.selectedObject, this.state.documentData) ? "explorerLink selectedRow" : "explorerLink"}>
                    <i className={getIcon(this.state.documentData.type)}></i>
                    {" " + this.state.documentData.name}
                </a>
            </div>
        );
    }
}

export default connect(
    state => state.commonStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Document);