import React from 'react';
import { connect } from 'react-redux';
import FileExplorer from './fileExplorer/FileExplorer';
import ViewSelectedPanel from './viewSelectedPanel/ViewSelectedPanel';
import SearchExplorer from './fileExplorer/SearchExplorer';
import NavMenu from './NavMenu';

const Home = props => (
  <div>
    <NavMenu />
    <div className="row">
      <div className="col-xl-3 col-md-4">
        <FileExplorer />
        <SearchExplorer />
      </div>
      <div className="col-xl-9 col-md-8" style={{ borderTop: "#e8f1ff 2px solid", borderLeft: "#e8f1ff 1px solid" }}>
        <ViewSelectedPanel />
      </div>
    </div>
  </div>
);

export default connect()(Home);
