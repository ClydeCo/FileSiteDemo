import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../style/NavMenu.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/AuthenticationStore';

import 'font-awesome/css/font-awesome.min.css';

class NavMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3 bg-primary" dark >
          <img className="img-responsive" style={{ maxHeight: "30px" }} src="largeLogo.svg" />
          <NavbarToggler onClick={this.toggle} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/" onClick={() => alert(JSON.stringify(this.props.authenticatedUser, null, 2))}>
                  <i className={"fa fa-user"}></i> {this.props.authenticatedUser.user.id}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/" onClick={this.props.requestLogoutFunction}><i className={"fa fa-sign-out"}></i></NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default connect(
  state => state.authenticationStore,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(NavMenu);