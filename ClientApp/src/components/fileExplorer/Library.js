import React, { Component } from 'react';
import MyFavorites from './MyFavorites';
import MyMatters from './MyMatters';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/CommonStore';
import Workspaces from './Workspaces';

import './../../style/FolderExplorerStyle.css';

class Library extends Component {
    constructor(props) {
        super(props);

        this.state = {
            library: this.props.library,
            loading: false
        }

        this.handleClickTitle = this.handleClickTitle.bind(this);
    }

    handleClickTitle(event) {
        event.preventDefault();
        event.stopPropagation();

        this.setState({
            showChildren: !this.state.showChildren
        });
    }

    render() {
        return (
            <div>
                <div className="hoverLi">
                    <a href="#" onClick={this.handleClickTitle} className="explorerLink">
                        <i className={this.state.showChildren ? "fa fa-book" : "fa fa-book"}></i>
                        {" " + this.state.library.alias}
                        {this.state.loading ? <i className="fa fa-spinner fa-spin"></i> : []}</a>
                </div>
                <div>
                    <ul className="list-unstyled" style={{ display: this.state.showChildren ? "inherit" : "none" }}>
                        <li>
                            <MyFavorites libraryName={this.state.library.alias} />
                        </li>
                        <li>
                            <MyMatters libraryName={this.state.library.alias} />
                        </li>
                        <li>
                            <Workspaces libraryName={this.state.library.alias} />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect(
    state => state.commonStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Library);