import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  applGetControlData,
  applHandleControlInput,
  applHandleControlCheckbox,
  applHandleControlAddress,
  applToggelModal
} from 'actions/ApplicantPage/ControlBar';
import { applLoadVacancies } from 'actions/ApplicantPage/Vacancies';
import GoogleAddressBar from './GoogleAddressBar.jsx';
import NotifModal from './NotifModal.jsx';
import ResumeModal from './ResumeModal.jsx';
import WithdrawAllAplModal from './WithdrawAllAplModal.jsx';

@connect(state => ({
  dataLoaded: state.applControlBar.get('dataLoaded'),
  pageError: state.applControlBar.get('pageError'),
  userInfo: state.applControlBar.get('userInfo'),
  searchLat: state.applControlBar.get('searchLat'),
  searchLng: state.applControlBar.get('searchLng'),
  searchAddress: state.applControlBar.get('searchAddress'),
  searchDistance: state.applControlBar.get('searchDistance'),
  searchFT: state.applControlBar.get('searchFT'),
  searchPT: state.applControlBar.get('searchPT'),
  searchTemp: state.applControlBar.get('searchTemp'),
  startDate: state.applControlBar.get('startDate'),
  endDate: state.applControlBar.get('endDate')
}))

export default class ControlBar extends Component {
  static propTypes = {
    dataLoaded: PropTypes.bool,
    pageError: PropTypes.bool,
    userInfo: PropTypes.object,
    searchLat: PropTypes.number,
    searchLng: PropTypes.number,
    searchAddress: PropTypes.string,
    searchDistance: PropTypes.number,
    searchFT: PropTypes.bool,
    searchPT: PropTypes.bool,
    searchTemp: PropTypes.bool,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._handleInputChange = this._handleInputChange.bind(this);
    this._validateForm = this._validateForm.bind(this);
    this._handleCheckBoxChange = this._handleCheckBoxChange.bind(this);
    this._handleManualSearch = this._handleManualSearch.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
    this._renderCompAfterData = this._renderCompAfterData.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(applGetControlData());
  }

  _handleInputChange(event) {
    this.props.dispatch(applHandleControlInput(event));
  }

  _handleCheckBoxChange(event) {
    this.props.dispatch(applHandleControlCheckbox(event));
  }

  _toggleModal(modalName) {
    this.props.dispatch(applToggelModal(modalName));
  }

  _validateForm() {

  }

  _handleManualSearch() {
    let jobTypeArr = [];
    this.props.searchFT ? jobTypeArr.push('FT') : null;
    this.props.searchPT ? jobTypeArr.push('PT') : null;
    this.props.searchTemp ? jobTypeArr.push('Temp') : null;
    const { dispatch } = this.props;
    dispatch(applLoadVacancies({
      freshReload: true,
      offsetQuery: 0,
      manualSearch: true,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      searchLat: this.props.searchLat,
      searchLng: this.props.searchLng,
      searchDistance: this.props.searchDistance,
      jobTypeArr
    }));
  }

  _renderCompAfterData() {
    if (this.props.dataLoaded && this.props.pageError) {
      return (
        <p className='page-msg'>
          <i className='fa fa-exclamation-triangle' aria-hidden='true' />
          Error in loading up the page
        </p>
      );
    } else if (this.props.dataLoaded) {
      return (
        <div className='card-content'>
          <div className='media'>
            <div className='media-content'>
              <p className='title is-5'>{this.props.userInfo.full_name}</p>
            </div>
          </div>
          <div className='content'>

            <div className='field'>
              <label className='label'>
                Search Area:
              </label>
              <div className='google-address-bar control'>
                <GoogleAddressBar
                  searchAddress={this.props.searchAddress}
                  saveNewSearchAddress={addressObj => this.props.dispatch(applHandleControlAddress(addressObj))}
                />
              </div>
            </div>

            <div className='field'>
              <div className='control'>
                <span className='select'>
                  <select
                    name='searchDistance'
                    onChange={this._handleInputChange}
                    defaultValue={this.props.searchDistance}
                  >
                    <option value=''>Range</option>
                    <option value={10000}>10km</option>
                    <option value={20000}>20km</option>
                    <option value={30000}>30km</option>
                    <option value={50000}>50km</option>
                    <option value={100000}>100km</option>
                    <option value={500000}>500km</option>
                    <option value={99999000}>All</option>
                  </select>
                </span>
              </div>
            </div>

            <div className='field vacancy-types'>
              <div className='control'>
                <label className='checkbox'>
                  <input
                    type='checkbox'
                    name='searchFT'
                    checked={this.props.searchFT}
                    onChange={this._handleCheckBoxChange} /> Full Time (Permanent)
                </label>
              </div>
              <div className='control'>
                <label className='checkbox'>
                  <input
                    type='checkbox'
                    name='searchPT'
                    checked={this.props.searchPT}
                    onChange={this._handleCheckBoxChange} /> Part Time (Permanent)
                </label>
              </div>
              <div className='control'>
                <label className='checkbox'>
                  <input
                    type='checkbox'
                    name='searchTemp'
                    checked={this.props.searchTemp}
                    onChange={this._handleCheckBoxChange} /> Temporary
                </label>
              </div>
            </div>

            <div className='field'>
              <div className='control'>
                <button className='button search-btn' onClick={this._handleManualSearch}><i className='fa fa-search' /> Quick Search</button>
              </div>
            </div>

            <hr />

            <nav className='panel'>
              <p className='panel-heading'>
                <i className='fa fa-gear' /> Quick Settings
              </p>
              <NotifModal toggleModal={() => this._toggleModal('notifModal')} />
              <a className='panel-block' onClick={() => this._toggleModal('notifModal')}>
                <span className='panel-icon'>
                  <i className='fa fa-bell' />
                </span>
                Notifications
              </a>
              <ResumeModal toggleModal={() => this._toggleModal('resumeModal')} />
              <a className='panel-block' onClick={() => this._toggleModal('resumeModal')}>
                <span className='panel-icon'>
                  <i className='fa fa-file' />
                </span>
                Resume / Cover Letter
              </a>
              <WithdrawAllAplModal toggleModal={() => this._toggleModal('withdrawAllModal')}/>
              <a className='panel-block' onClick={() => this._toggleModal('withdrawAllModal')}>
                <span className='panel-icon'>
                  <i className='fa fa-remove' />
                </span>
                Delete All Applications
              </a>
            </nav>

          </div>

        </div>
      );
    } else {
      return (
        <p className='page-msg'>
          <i className='fa fa-spinner fa-spin fa-3x fa-fw'></i>
          <span className='sr-only'>Loading...</span>
        </p>
      );
    }
  }

  render() {
    return (
      <div id='control-bar' className='card control-bar'>
        { this._renderCompAfterData() }
      </div>
    );
  }
}
