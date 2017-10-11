import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Switch from 'react-toggle-switch';
import 'react-toggle-switch/dist/css/switch.min.css';
import { applModalHandleChng } from 'actions/ApplicantPage/ControlBar';

@connect(state => ({
  dataLoaded: state.applControlBar.get('dataLoaded'),
  pageError: state.applControlBar.get('pageError'),
  modals: state.applControlBar.get('modals'),
  modalValues: state.applControlBar.get('modalValues')
}))

export default class NotifModal extends Component {
  static propTypes = {
    dataLoaded: PropTypes.bool,
    pageError: PropTypes.bool,
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
    const { modals, toggleModal, modalValues, dataLoaded, pageError } = this.props;
    if (dataLoaded && !pageError) {
      return (
        <div className={modals.notifModal ? 'modal is-active' : 'modal'}>
          <div className='modal-background' onClick={toggleModal} />
          <div className='modal-card'>
            <header className='modal-card-head'>
              <p className='modal-card-title'>Notification Modal</p>
              <button className='delete' aria-label='close' onClick={toggleModal} />
            </header>
            <section className='modal-card-body'>

              <Switch onClick={this._handleSwitch} on={modalValues.getNotified || false} />
              Manage Notifications
            </section>
            <footer className='modal-card-foot'>
              <button className='button is-success'>Save changes</button>
              <button className='button' onClick={toggleModal}>Cancel</button>
            </footer>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
