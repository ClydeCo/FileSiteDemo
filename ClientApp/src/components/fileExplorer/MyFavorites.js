import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './../../style/FolderExplorerStyle.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/MyFavoritesStore';

class MyFavorites extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showChildren: false,
            loading: false,
            libraryName: this.props.libraryName
        };

        this.handleClickTitle = this.handleClickTitle.bind(this);
        this.receivedCallback = this.receivedCallback.bind(this);
    }

    receivedCallback() {
        this.setState({
            loading: false
        })
    }

    ensureDataFetched() {
        this.setState({ loading: true });
        //this.props.requestDatabaseFilingFoldersFunction(this.state.database.id, this.receivedCallback);
    }


    handleClickTitle(event) {
        event.preventDefault();
        event.stopPropagation();

        this.props.requestMyFavoritesFunction(this.state.libraryName, (favorites) => console.log(JSON.stringify(favorites, null, 2)));
    }

    render() {
        return (
            <div>
                <a href="#" onClick={this.handleClickTitle} className="explorerLink"><i className="fa fa-star"></i> My Favorites
                    {this.state.loading ? <i className="fa fa-spinner fa-spin"></i> : []}</a>
            </div>
        );
    }
}


export default connect(
    state => state.myFavoritesStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(MyFavorites);