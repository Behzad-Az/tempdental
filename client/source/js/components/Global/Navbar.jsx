import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'config/routes';
import { navChangeView } from 'actions/Global/Navbar';

@connect(state => ({
  showBurgerMenu: state.navbar.get('showBurgerMenu'),
  currentView: state.navbar.get('currentView')
}))

export default class Navbar extends Component {
  static propTypes = {
    showBurgerMenu: PropTypes.bool,
    currentView: PropTypes.string
  }

  constructor() {
    super();
    this._toggleMenu = this._toggleMenu.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.props.showBurgerMenu ? this._toggleMenu({ forceOff: true }) : null);
  }

  _toggleMenu(args) {
    this.props.dispatch(navChangeView(args));
  }

  render() {
    const { showBurgerMenu, currentView } = this.props;
    return (
      <nav className='navbar'>
        <div className='navbar-brand'>
          <a className='navbar-item' href='http://bulma.io'>
            <img src='http://bulma.io/images/bulma-logo.png' alt='Bulma: a modern CSS framework based on Flexbox' width='112' height='28' />
          </a>
          <div
            className={showBurgerMenu ? 'navbar-burger burger is-active' : 'navbar-burger burger'}
            onClick={() => this._toggleMenu({ forceOff: false })}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={showBurgerMenu ? 'navbar-menu is-active' : 'navbar-menu'}>
          <div className='navbar-end'>
            <NavLink
              className={currentView === routeCodes.EMPLOYER ? 'navbar-item underlined' : 'navbar-item'}
              to={routeCodes.EMPLOYER}
              onClick={() => this._toggleMenu({ forceOff: true, currentView: routeCodes.EMPLOYER })}>
              <i className='fa fa-institution'/> Employer
            </NavLink>
            <NavLink
              className={currentView === routeCodes.APPLICANT ? 'navbar-item underlined' : 'navbar-item'}
              to={routeCodes.APPLICANT}
              onClick={() => this._toggleMenu({ forceOff: true, currentView: routeCodes.APPLICANT })}>
              <i className='fa fa-user'/> Applicant
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}
