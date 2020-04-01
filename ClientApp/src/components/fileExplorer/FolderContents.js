import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/FolderStore';
import Folder from './Folder';
import Document from './Document';

class FolderContents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            folderId: this.props.folderId
        };
    }

    render() {
        return (
            <div>
                <ul className="list-unstyled">
                    {this.props.folders.filter(fil => fil.parent_id == this.state.folderId).map(f =>
                        <li key={f.id}>
                            <Folder
                                key={f.id}
                                folderId={f.id}
                                folderName={f.name}
                                folderData={f}
                            />
                        </li>
                    )}
                    {this.props.documents.filter(fil => fil.parent_id == this.state.folderId).map(d =>
                        <li key={d.id}>
                            <Document
                                key={d.id}
                                documentData={d}
                            />
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default connect(
    state => state.folderStore,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(FolderContents);