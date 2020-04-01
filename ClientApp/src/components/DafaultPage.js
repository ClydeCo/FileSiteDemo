import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/AuthenticationStore';

import _ from 'lodash';

const DefaultPage = props => (
    <div className="row">
        <div className="col-md-12 text-center"><h1>Welcome, {props.authenticatedUser.user.id}</h1></div>
        <h4 style={{ marginTop: "30px" }}>Here is your authorization data:</h4>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Field</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(props.authenticatedUser).filter(key => !_.isObject(props.authenticatedUser[key])).map(key =>
                    <tr key={key}>
                        <td>{key}</td>
                        <td>
                            {props.authenticatedUser[key]}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        <h4 style={{ marginTop: "30px" }}>Here is your user data:</h4>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Field</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(props.authenticatedUser.user).map(key =>
                    <tr key={key}>
                        <td>{key}</td>
                        <td>
                            {props.authenticatedUser.user[key]}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

export default connect(
    state => state.authenticationStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(DefaultPage);