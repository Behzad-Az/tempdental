import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { applApplyOrWithdraw } from 'actions/ApplicantPage/Vacancies';

@connect(state => ({
  modals: state.applControlBar.get('modals')
}))

export default class WithdrawAllModal extends Component {
  static propTypes = {
    modals: PropTypes.object,
    toggleModal: PropTypes.func,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._withdrawAllApplications = this._withdrawAllApplications.bind(this);
  }

  _withdrawAllApplications() {
    const { dispatch, toggleModal } = this.props;
    fetch('/api/applicant/applications?vacancyId=_all', {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/string',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.ok ?
      dispatch(applApplyOrWithdraw({ action: 'withdraw', vacancyId: '_all' })) :
      null
    )
    .catch(console.error)
    .then(toggleModal);
  }

  render() {
    const { modals, toggleModal } = this.props;
    return (
      <div className={modals.withdrawAllModal ? 'modal is-active' : 'modal'}>
        <div className='modal-background' onClick={toggleModal} />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Are you sure?</p>
            <button className='delete' aria-label='close' onClick={toggleModal} />
          </header>
          <section className='modal-card-body'>
            This action will withdraw all of your outstanding applications and cannot be undone.
          </section>
          <footer className='modal-card-foot'>
            <button className='button is-success' onClick={this._withdrawAllApplications}>I am sure</button>
            <button className='button' onClick={toggleModal}>Never mind</button>
          </footer>
        </div>
      </div>
    );
  }
}
