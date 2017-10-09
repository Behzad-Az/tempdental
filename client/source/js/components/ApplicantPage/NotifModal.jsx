import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle';

@connect(state => ({
  modals: state.applControlBar.get('modals')
}))

export default class NotifModal extends Component {
  static propTypes = {
    modals: PropTypes.object,
    toggleModal: PropTypes.func,
    dispatch: PropTypes.func
  }

  render() {
    const { modals, toggleModal } = this.props;
    return (
      <div className={modals.notifModal ? 'modal is-active' : 'modal'}>
        <div className='modal-background' onClick={toggleModal} />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Notification Modal</p>
            <button className='delete' aria-label='close' onClick={toggleModal} />
          </header>
          <section className='modal-card-body'>


            <label className='react-toggle-wrapper-label'>
              <Toggle
                defaultChecked={true}
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
  }
}
