import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

@connect(state => ({
  modals: state.applControlBar.get('modals')
}))

export default class ResumeModal extends Component {
  static propTypes = {
    modals: PropTypes.object,
    toggleModal: PropTypes.func,
    dispatch: PropTypes.func
  }

  render() {
    return (
      <div className={this.props.modals.resumeModal ? 'modal is-active' : 'modal'}>
        <div className='modal-background' onClick={this.props.toggleModal} />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Resume Modal</p>
            <button className='delete' aria-label='close' onClick={this.props.toggleModal} />
          </header>
          <section className='modal-card-body'>
            Resume Modal
          </section>
          <footer className='modal-card-foot'>
            <button className='button is-success'>Save changes</button>
            <button className='button' onClick={this.props.toggleModal}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}
