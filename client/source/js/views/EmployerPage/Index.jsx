import React, {Component} from 'react';
import PostingsContainer from 'components/EmployerPage/PostingsContainer.jsx';
import ControlBar from 'components/EmployerPage/ControlBar.jsx';

export default class EmployerPage extends Component {

  constructor() {
    super();
    this._toggleControlBar = this._toggleControlBar.bind(this);
  }

  componentDidMount() {
    document.title = 'Employer Page';
  }

  _toggleControlBar() {
    const controlBar = document.getElementById('control-bar');
    controlBar.classList.contains('is-open') ? controlBar.classList.remove('is-open') : controlBar.classList.add('is-open');
  }

  render() {
    return (
      <div className='employer-page'>
        <div className='hamburger'>
          <i className='fa fa-navicon' onClick={this._toggleControlBar} />
        </div>
        <ControlBar />
        <PostingsContainer />
      </div>
    );
  }
};
