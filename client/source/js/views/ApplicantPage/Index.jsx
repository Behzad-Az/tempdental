import React, {Component} from 'react';
import VacanciesContainer from 'components/ApplicantPage/VacanciesContainer.jsx';
import ControlBar from 'components/ApplicantPage/ControlBar.jsx';

export default class ApplicantPage extends Component {

  constructor() {
    super();
    this._toggleControlBar = this._toggleControlBar.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  componentDidMount() {
    document.title = 'Applicant Page';
  }

  _toggleControlBar() {
    const controlBar = document.getElementById('control-bar');
    controlBar.classList.contains('is-open') ? controlBar.classList.remove('is-open') : controlBar.classList.add('is-open');
  }

  _handleOutsideClick() {
    const controlBar = document.getElementById('control-bar');
    controlBar.classList.contains('is-open') ? controlBar.classList.remove('is-open') : null;
  }

  render() {
    return (
      <div className='applicant-page'>
        <div className='hamburger'>
          <i className='fa fa-wrench' onClick={this._toggleControlBar} />
        </div>
        <ControlBar />
        <div onClick={this._handleOutsideClick}>
          <VacanciesContainer />
        </div>
      </div>
    );
  }
};
