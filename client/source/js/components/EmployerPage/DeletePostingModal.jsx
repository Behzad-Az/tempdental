import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { empDeletePosting } from 'actions/EmployerPage/Postings';

@connect(state => ({
  modals: state.empControlBar.get('modals'),
  modalValues: state.empControlBar.get('modalValues')
}))

export default class DeletePostingModal extends Component {
  static propTypes = {
    modals: PropTypes.object,
    modalValues: PropTypes.object,
    toggleModal: PropTypes.func,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._handleDeletePosting = this._handleDeletePosting.bind(this);
  }

  _handleDeletePosting() {
    const { dispatch, toggleModal, modalValues } = this.props;
    fetch(`/api/employer/vacancies?vacancyId=${modalValues.vacancyId}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/string',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.ok ?
      dispatch(empDeletePosting(modalValues.vacancyId)) :
      null
    )
    .catch(console.error)
    .then(toggleModal);
  }

  render() {
    const { modals, toggleModal, modalValues } = this.props;
    return (
      <div className={modals.deletePostingModal ? 'modal is-active' : 'modal'}>
        <div className='modal-background' onClick={toggleModal} />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Are you sure?</p>
            <button className='delete' aria-label='close' onClick={toggleModal} />
          </header>
          <section className='modal-card-body'>
            {
              modalValues.vacancyId === '_all' ?
              'This will close all of your outstanding postings and all assosciated applications. This cannot be undone.' :
              'This will close this posting and all assosciated applications. This cannot be undone'
            }
          </section>
          <footer className='modal-card-foot'>
            <button className='button is-success' onClick={this._handleDeletePosting}>I am sure</button>
            <button className='button' onClick={toggleModal}>Never mind</button>
          </footer>
        </div>
      </div>
    );
  }
}
