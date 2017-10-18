import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Switch from 'react-toggle-switch';
import 'react-toggle-switch/dist/css/switch.min.css';
import { applModalHandleChng, applModalAddressChng } from 'actions/ApplicantPage/ControlBar';
import GoogleAddressBar from './GoogleAddressBar.jsx';

@connect(state => ({
  modals: state.applControlBar.get('modals'),
  modalValues: state.applControlBar.get('modalValues')
}))

export default class NotifModal extends Component {
  static propTypes = {
    modals: PropTypes.object,
    modalValues: PropTypes.object,
    toggleModal: PropTypes.func,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._handleChange = this._handleChange.bind(this);
    this._handleSwitch = this._handleSwitch.bind(this);
  }

  _handleChange(event) {
    this.props.dispatch(applModalHandleChng(event));
  }

  _handleSwitch() {
    const event = {
      target: {
        name: 'getNotified',
        value: !this.props.modalValues.getNotified
      }
    };
    this._handleChange(event);
  }

  render() {
    const { modals, toggleModal, modalValues, dispatch } = this.props;
    return (
      <div className={modals.notifModal ? 'modal is-active' : 'modal'}>
        <div className='modal-background' onClick={toggleModal} />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Manage Notifications</p>
            <button className='delete' aria-label='close' onClick={toggleModal} />
          </header>
          <section className='modal-card-body'>

            <div className='field'>
              <div className='control'>
                <label className='label'>
                  Notifications: {modalValues.getNotified ? '(On)' : '(Off)'}
                </label>
                <Switch onClick={this._handleSwitch} on={modalValues.getNotified || false} />
              </div>
            </div>

            <div className={modalValues.getNotified ? 'params' : 'params is-hidden'}>
              <div className='field'>
                <label className='label'>
                  Search Area:
                </label>
                <div className='google-address-bar control'>
                  <GoogleAddressBar
                    searchAddress={modalValues.address}
                    saveNewSearchAddress={searchObj => dispatch(applModalAddressChng(searchObj))}
                  />
                </div>
              </div>

              <div className='field'>
                <div className='control'>
                  <span className='select'>
                    <select
                      name='searchDistance'
                      onChange={this._handleChange}
                      value={modalValues.searchDistance}
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
                      checked={modalValues.searchFt}
                      onChange={this._handleChange} /> Full Time (Permanent)
                  </label>
                </div>
                <div className='control'>
                  <label className='checkbox'>
                    <input
                      type='checkbox'
                      name='searchPt'
                      checked={modalValues.searchPt}
                      onChange={this._handleChange} /> Part Time (Permanent)
                  </label>
                </div>
                <div className='control'>
                  <label className='checkbox'>
                    <input
                      type='checkbox'
                      name='searchTemp'
                      checked={modalValues.searchTemp}
                      onChange={this._handleChange} /> Temporary
                  </label>
                </div>
              </div>

            </div>
          </section>
          <footer className='modal-card-foot'>
            <button className='button is-success'>Save changes</button>
            <button className='button' onClick={toggleModal}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}
