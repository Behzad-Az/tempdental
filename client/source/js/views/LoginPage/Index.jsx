import React, {Component} from 'react';
// import PostingsContainer from 'components/EmployerPage/PostingsContainer.jsx';
// import ControlBar from 'components/EmployerPage/ControlBar.jsx';

export default class LoginPage extends Component {

  constructor() {
    super();
    // this._toggleControlBar = this._toggleControlBar.bind(this);
    // this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  componentDidMount() {
    document.title = 'Login';
  }

  // _toggleControlBar() {
  //   const controlBar = document.getElementById('control-bar');
  //   controlBar.classList.contains('is-open') ? controlBar.classList.remove('is-open') : controlBar.classList.add('is-open');
  // }

  // _handleOutsideClick() {
  //   const controlBar = document.getElementById('control-bar');
  //   controlBar.classList.contains('is-open') ? controlBar.classList.remove('is-open') : null;
  // }

  render() {
    return (
      <div className='login-page'>
        <div className='main-container'>
          <h1 className='header'>Login</h1>
        </div>
      </div>
    );
  }
};
