import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import WorkspaceShortcut from './WorkspaceShortcut';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/MyMattersStore';

import './../../style/FolderExplorerStyle.css';

class MyMatters extends Component {
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

    callBackFunction(myMatters) {
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

        this.props.requestMyMattersFunction(this.state.libraryName, this.callBackFunction);
    }

    render() {
        return (
            <div>
                <a href="#" onClick={this.handleClickTitle} className="explorerLink"><i className={this.state.showChildren ? "fa fa-folder-open" : "fa fa-folder"}></i> My Matters
                    {this.state.loading ? <i className="fa fa-spinner fa-spin"></i> : []}</a>

                <ul className="list-unstyled" style={{ display: this.state.showChildren ? "inherit" : "none" }}>
                    {this.props.myMatters.map(item =>
                        <li key={item.id}>
                            <WorkspaceShortcut key={item.id}
                                shortcut={item}
                            />
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}


export default connect(
    state => state.myMattersStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(MyMatters);