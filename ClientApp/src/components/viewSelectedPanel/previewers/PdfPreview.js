import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../../store/DocumentStore';

import _ from 'lodash';

class PdfPreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };

        this.embedLoaded = this.embedLoaded.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //this.setState({ theObject: nextProps.theObject });
    }

    handleConfirmChanges() {
        this.setState({
            showModal: false
        });
    }

    embedLoaded() {
        alert("loaded");
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="row text-center">
                        <embed src={this.props.loadedDocUrl + "#toolbar=0&navpanes=0"} type="application/pdf" width="100%" height="600px" onLoad={this.embedLoaded} />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state.documentStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(PdfPreview);