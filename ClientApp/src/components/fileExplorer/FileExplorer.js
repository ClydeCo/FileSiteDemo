import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/AuthenticationStore';
import Library from './Library';


class FileExplorer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }

        this.receivedCallback = this.receivedCallback.bind(this);
        this.collapseAll = this.collapseAll.bind(this);
    }

    componentDidMount() {
        this.ensureDataFetched();
    }

    componentDidUpdate() {
        this.ensureDataFetched();
    }

    receivedCallback() {
        this.setState({
            loading: false
        });
    }

    ensureDataFetched() {

    }

    collapseAll() {
        this.props.collapseAllFoldersFunction();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h4>FileSite Explorer</h4>
                    {this.state.loading ? <i className="fa fa-spinner fa-spin"></i> : []}
                    <ul className="list-unstyled" style={{ paddingLeft: "0px" }}>
                        {this.props.authenticatedUser.work.libraries.map(library =>
                            <li key={library.alias}>
                                <Library key={library.alias}
                                    library={library}
                                />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect(
    state => state.authenticationStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(FileExplorer);