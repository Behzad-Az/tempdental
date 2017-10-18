import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  applGetControlData,
  applHandleControlChng,
  applHandleControlAddress,
  applToggelModal
} from 'actions/ApplicantPage/ControlBar';
import { applLoadVacancies } from 'actions/ApplicantPage/Vacancies';
import GoogleAddressBar from './GoogleAddressBar.jsx';
import NotifModal from './NotifModal.jsx';
import ResumeModal from './ResumeModal.jsx';
import WithdrawAllModal from './WithdrawAllModal.jsx';

@connect(state => ({
  dataLoaded: state.applControlBar.get('dataLoaded'),
  pageError: state.applControlBar.get('pageError'),
  userInfo: state.applControlBar.get('userInfo'),
  searchLat: state.applControlBar.get('searchLat'),
  searchLng: state.applControlBar.get('searchLng'),
  searchAddress: state.applControlBar.get('searchAddress'),
  searchDistance: state.applControlBar.get('searchDistance'),
  searchFt: state.applControlBar.get('searchFt'),
  searchPt: state.applControlBar.get('searchPt'),
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
    searchFt: PropTypes.bool,
    searchPt: PropTypes.bool,
    searchTemp: PropTypes.bool,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._handleChange = this._handleChange.bind(this);
    this._validateForm = this._validateForm.bind(this);
    this._handleManualSearch = this._handleManualSearch.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
    this._setUpNotifModal = this._setUpNotifModal.bind(this);
    this._renderCompAfterData = this._renderCompAfterData.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(applGetControlData());
  }

  _handleChange(event) {
    this.props.dispatch(applHandleControlChng(event));
  }

  _toggleModal(modalName) {
    this.props.dispatch(applToggelModal(modalName));
  }

  _setUpNotifModal() {
    const { userInfo } = this.props;
    this._toggleModal({
      action: '_edit',
      getNotified: userInfo.get_notified || true,
      searchFt: userInfo.search_ft,
      searchPt: userInfo.search_pt && false,
      searchTemp: userInfo.search_temp,
      searchDistance: userInfo.search_distance,
      address: userInfo.address,
      lat: userInfo.lat,
      lng: userInfo.lng,
      modalName: 'notifModal'
    });
  }

  _validateForm() {

  }

  _handleManualSearch() {
    const { searchFt, searchPt, searchTemp, startDate, endDate, searchLat, searchLng, searchDistance, dispatch } = this.props;
    let jobTypeArr = [];
    searchFt ? jobTypeArr.push('FT') : null;
    searchPt ? jobTypeArr.push('PT') : null;
    searchTemp ? jobTypeArr.push('Temp') : null;
    dispatch(applLoadVacancies({
      freshReload: true,
      offsetQuery: 0,
      manualSearch: true,
      startDate,
      endDate,
      searchLat,
      searchLng,
      searchDistance,
      jobTypeArr
    }));
  }

  _renderCompAfterData() {
    const {
      dataLoaded, pageError, userInfo, searchAddress,
      searchDistance, searchFt, searchPt, searchTemp,
      dispatch
    } = this.props;
    if (dataLoaded && pageError) {
      return (
        <p className='page-msg'>
          <i className='fa fa-exclamation-triangle' aria-hidden='true' />
          Error in loading up the page
        </p>
      );
    } else if (dataLoaded) {
      return (
        <div className='card-content'>
          <div className='media'>
            <div className='media-content'>
              <p className='title is-5'>{userInfo.full_name}</p>
            </div>
          </div>
          <div className='content'>

            <div className='field'>
              <label className='label'>
                Search Area:
              </label>
              <div className='google-address-bar control'>
                <GoogleAddressBar
                  searchAddress={searchAddress}
                  saveNewSearchAddress={addressObj => dispatch(applHandleControlAddress(addressObj))}
                />
              </div>
            </div>

            <div className='field'>
              <div className='control'>
                <span className='select'>
                  <select
                    name='searchDistance'
                    onChange={this._handleChange}
                    defaultValue={searchDistance}
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

            <div className='field'>
              <div className='control'>
                <label className='checkbox'>
                  <input
                    type='checkbox'
                    name='searchFt'
                    checked={searchFt}
                    onChange={this._handleChange} /> Full Time (Permanent)
                </label>
              </div>
              <div className='control'>
                <label className='checkbox'>
                  <input
                    type='checkbox'
                    name='searchPt'
                    checked={searchPt}
                    onChange={this._handleChange} /> Part Time (Permanent)
                </label>
              </div>
              <div className='control'>
                <label className='checkbox'>
                  <input
                    type='checkbox'
                    name='searchTemp'
                    checked={searchTemp}
                    onChange={this._handleChange} /> Temporary
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

              <a className='panel-block' onClick={this._setUpNotifModal}>
                <span className='panel-icon'>
                  <i className='fa fa-bell' />
                </span>
                Notifications
              </a>

              <a className='panel-block' onClick={() => this._toggleModal({ modalName: 'resumeModal' })}>
                <span className='panel-icon'>
                  <i className='fa fa-file' />
                </span>
                Resume / Cover Letter
              </a>

              <a className='panel-block' onClick={() => this._toggleModal({ modalName: 'withdrawAllModal' })}>
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
      <div>
        <div id='control-bar' className='card control-bar'>
          { this._renderCompAfterData() }
        </div>
        <div className='modals'>
          <NotifModal toggleModal={() => this._toggleModal({ modalName: 'notifModal' })} />
          <ResumeModal toggleModal={() => this._toggleModal({ modalName: 'resumeModal' })} />
          <WithdrawAllModal toggleModal={() => this._toggleModal({ modalName: 'withdrawAllModal' })} />
        </div>
      </div>
    );
  }
}
