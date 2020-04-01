import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/CommonStore';

import _ from 'lodash';

class WorkspaceView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            theObject: { ...this.props.theObject }
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ theObject: nextProps.theObject });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="row text-center">
                        <h2><i className="fa fa-briefcase"></i> {this.state.theObject.name}</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">

                                </div>
                                <div className="card-body">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Field</th>
                                                <th>Data</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(this.state.theObject).map(key =>
                                                <tr key={key}>
                                                    <td>{key}</td>
                                                    <td>
                                                        {this.state.theObject[key]}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state.commonStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(WorkspaceView);