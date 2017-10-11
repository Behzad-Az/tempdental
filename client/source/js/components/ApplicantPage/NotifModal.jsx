import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle';

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
              <label className='checkbox'>
                <input
                  type='checkbox'
                  name='chert'
                  defaultChecked={modalValues.getNotified}
                  onChange={null} /> CHERT
              </label>

              <label className='react-toggle-wrapper-label'>
                <Toggle
                  defaultChecked={modalValues.getNotified}
                  onChange={this.handleBaconChange} />
                <span className='react-toggle-label'>Receive Notifications?</span>
              </label>
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
