import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'config/routes';
import { navToggleBurger } from 'actions/Global/Navbar';

@connect(state => ({
  showBurgerMenu: state.navbar.get('showBurgerMenu')
}))

export default class Navbar extends Component {
  static propTypes = {
    showBurgerMenu: PropTypes.bool
  }

  constructor() {
    super();
    this._toggleMenu = this._toggleMenu.bind(this);
  }

  _toggleMenu(forceOff) {
    this.props.dispatch(navToggleBurger(forceOff));
  }

  render() {
    const { showBurgerMenu } = this.props;
    console.log("i' here 0: ", this.props.histroy);
    return (
      <nav className='navbar'>
        <div className='navbar-brand'>
          <a className='navbar-item' href='http://bulma.io'>
            <img src='http://bulma.io/images/bulma-logo.png' alt='Bulma: a modern CSS framework based on Flexbox' width='112' height='28' />
          </a>
          <div
            className={showBurgerMenu ? 'navbar-burger burger is-active' : 'navbar-burger burger'}
            onClick={() => this._toggleMenu(false)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={showBurgerMenu ? 'navbar-menu is-active' : 'navbar-menu'}>
          <div className='navbar-end'>
            <NavLink className='navbar-item' to={routeCodes.EMPLOYER} onClick={() => this._toggleMenu(true)}>
              Employer
            </NavLink>
            <NavLink className='navbar-item' to={routeCodes.APPLICANT} onClick={() => this._toggleMenu(true)}>
              Applicant
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}
