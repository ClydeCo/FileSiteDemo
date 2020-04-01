import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/SearchStore';

import SearchList from './SearchList';

import _ from 'lodash';

class SearchExplorer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searching: false,
            nameValue: "",
            typeValue: "",
            searchResults: [],
            showWorkspaces: false,
            showDocuments: false,
            showEmails: false,
            showUsers: false
        }

        this.handleNameValueChange = this.handleNameValueChange.bind(this);
        this.handleTypeValueChange = this.handleTypeValueChange.bind(this);
        this.callbackFunction = this.callbackFunction.bind(this);
        this.createDisplayList = this.createDisplayList.bind(this);
        this.fetchSearchResults = this.fetchSearchResults.bind(this);
        this.attemptSearch = this.attemptSearch.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ searchResults: nextProps.searchResults });
    }

    componentDidMount() {
        this.fetchSearchResults = _.debounce(this.fetchSearchResults, 500);
    }

    fetchSearchResults() {
        this.props.requestSearchResultsFunction(
            this.state.nameValue.length > 0 ? this.state.nameValue : null,
            this.state.typeValue.length > 0 ? this.state.typeValue : null,
            this.callbackFunction);
    }

    callbackFunction(searchResults) {
        this.setState({
            searching: false,
            searchResults: searchResults
        });
    }

    handleNameValueChange = event => {
        event.preventDefault();
        event.stopPropagation();

        this.setState({
            nameValue: event.target.value
        });
        this.attemptSearch();
    }

    handleTypeValueChange = event => {
        event.preventDefault();
        event.stopPropagation();

        this.setState({
            typeValue: event.target.value
        });
        this.attemptSearch();
    }

    attemptSearch() {
        if (this.state.nameValue.length > 0 ||
            this.state.typeValue.length > 0) {
            this.setState({
                searching: true
            });

            this.fetchSearchResults();
        }
        else {
            this.setState({
                searchResults: []
            });
        }
    }



    createDisplayList(list, title, icon, getKey, getTitle, onClickToggle, isVisible) {
        return (
            <div>
                <a href="#" onClick={onClickToggle} style={{ color: "#00006E" }}>
                    <i className={"fa fa-" + icon}></i><strong> {title} [{!_.isEmpty(list) ? list.length : 0}]</strong><br />
                </a>
                <ul className="list-unstyled" style={{ marginLeft: "16px", display: isVisible() ? "inherit" : "none" }}>
                    {
                        !_.isEmpty(list) ?
                            (list.map(o =>
                                <li key={getKey(o)}>
                                    {console.log(getKey(o))}
                                    {getTitle(o)}
                                </li>
                            ))
                            : []
                    }
                </ul>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="searchField">Search</label>
                            <div className="card">
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="searchField">Name:</label>
                                        <input className="form-control" type="text" id="searchField" value={this.state.nameValue} onChange={this.handleNameValueChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="typeField">Type:</label>
                                        <input className="form-control" type="text" id="typeField" value={this.state.typeValue} onChange={this.handleTypeValueChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card" style={this.state.nameValue.length > 0 ? { display: "inherit" } : { display: "none" }}>
                            <div className="card-header" style={{ textAlign: "center" }}>
                                <strong>Search Results</strong>
                            </div>
                            <div className="card-body" style={{ overflowWrap: "break-word" }}>
                                {this.state.searching ? (<div style={{ textAlign: "center" }}><span><i className="fa fa-spinner fa-spin"></i> searching</span></div>) : []}
                                <i>"{this.state.nameValue}"</i><br />
                                {!this.state.searching && !_.isEmpty(this.state.searchResults) ?
                                    (
                                        <div>
                                            <SearchList
                                                list={this.state.searchResults.filter(d => d.wstype === "document")}
                                                title="Documents"
                                                icon="file"
                                                getKey={(o) => o.id}
                                                getTitle={(o) => o.id}
                                                onClickToggle={(e) => this.setState({ showDocuments: !this.state.showDocuments })}
                                                isVisible={() => this.state.showDocuments}
                                                onListItemClicked={(o) => this.props.setSelectedObjectFunction(o)}
                                            />
                                            <SearchList
                                                list={this.state.searchResults.filter(d => d.wstype === "email")}
                                                title="Emails"
                                                icon="envelope"
                                                getKey={(o) => o.id}
                                                getTitle={(o) => o.id}
                                                onClickToggle={(e) => this.setState({ showEmails: !this.state.showEmails })}
                                                isVisible={() => this.state.showEmails}
                                                onListItemClicked={(o) => this.props.setSelectedObjectFunction(o)}
                                            />
                                        </div>
                                    )
                                    : []}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default connect(
    state => state.searchStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(SearchExplorer);