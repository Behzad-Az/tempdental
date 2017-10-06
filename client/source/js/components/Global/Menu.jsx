import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'config/routes';
import workAndCoLogoImg from '../../../assets/img/workco-logo.svg';

export default class Menu extends Component {

  constructor() {
    super();
    this._toggleMenu = this._toggleMenu.bind(this);
  }

  _toggleMenu() {
    const menu = document.getElementById('balls');
    menu.classList.contains('is-active') ? menu.classList.remove('is-active') : menu.classList.add('is-active');

    const menu2 = document.getElementById('sucks');
    menu2.classList.contains('is-active') ? menu2.classList.remove('is-active') : menu2.classList.add('is-active');
  }

  render() {
    return (

      <nav className='navbar is-transparent'>
        <div className='navbar-brand'>
          <a className='navbar-item' href='http://bulma.io'>
            <img src='http://bulma.io/images/bulma-logo.png' alt='Bulma: a modern CSS framework based on Flexbox' width='112' height='28' />
          </a>

          <a className='navbar-item is-hidden-mobile' href='https://twitter.com/jgthms' target='_blank'>
            <span className='icon' >
              <i className='fa fa-lg fa-twitter'></i>
            </span>
          </a>

          <div id='balls' className='navbar-burger burger' data-target='navMenuTransparentExample' onClick={this._toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id='sucks' className='navbar-menu'>
          <div className='navbar-start'>
            <div className='navbar-item has-dropdown is-hoverable'>

              <div className='navbar-dropdown is-boxed'>
                <NavLink className='navbar-item' to='/applicant'>
                  Applicant
                </NavLink>
                <NavLink className='navbar-item' to='/employer'>
                  Employer
                </NavLink>

              </div>
            </div>

          </div>


        </div>
      </nav>

    );

    // return (
    //   <nav className='navbar' role='navigation' aria-label='main navigation'>
    //     <div className='navbar-brand'>
    //       <a className='navbar-item' href='http://bulma.io'>
    //         <img src='http://bulma.io/images/bulma-logo.png' alt='Bulma: a modern CSS framework based on Flexbox' width='112' height='28' />
    //       </a>

    //       <button id='nav-bar-menu' className='button navbar-burger' onClick={this._toggleMenu}>
    //         <span></span>
    //         <span></span>
    //         <span></span>
    //       </button>


    //     </div>

    //   </nav>
    // );
  }

  // render() {
  //   return (
  //     <div className='Menu'>
  //       <div className='Menu-logo'>
  //         <img
  //           src={ workAndCoLogoImg }
  //           alt='Work & Co logo'
  //         />
  //       </div>
  //       <div className='Menu-links'>
  //         <NavLink
  //           activeClassName='Menu-link--active'
  //           className='Menu-link'
  //           exact
  //           to={ routeCodes.APPLICANTPAGE }
  //         >
  //           Applicant
  //         </NavLink>
  //         <NavLink
  //           activeClassName='Menu-link--active'
  //           className='Menu-link'
  //           to={ routeCodes.EMPLOYERPAGE }
  //         >
  //           Employer
  //         </NavLink>
  //         <NavLink
  //           activeClassName='Menu-link--active'
  //           className='Menu-link'
  //           to='/404'
  //         >
  //           404
  //         </NavLink>
  //       </div>
  //     </div>
  //   );
  // }
}
