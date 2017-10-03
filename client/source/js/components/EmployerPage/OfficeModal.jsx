import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoogleAddressBar from 'components/ApplicantPage/GoogleAddressBar.jsx';

@connect(state => ({
  modals: state.empControlBar.get('modals'),
  modalValues: state.empControlBar.get('modalValues')
}))

export default class OfficeModal extends Component {
  static propTypes = {
    modals: PropTypes.object,
    modalValues: PropTypes.object,
    toggleModal: PropTypes.func,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._renderModalBody = this._renderModalBody.bind(this);
  }

  _renderModalBody() {
    const { action, name, address, more_info } = this.props.modalValues;
    if (action) {
      return (
        <section className='modal-card-body'>
          <div className='field'>
            <label className='label'>
              Office Name:
            </label>
            <p className='control'>
              <input
                className='input'
                type='text'
                name='name'
                defaultValue={name}
                placeholder='Example: Bright Smiles Clinic - Vancouver' />
            </p>
          </div>
          <div className='field'>
            <label className='label'>
              Office Description:
            </label>
            <p className='control'>
              <textarea
                className='textarea'
                name='description'
                defaultValue={more_info}
                placeholder='Example: blah blah blah blah blah' />
            </p>
          </div>
          <div className='google-address-bar control'>
            <GoogleAddressBar
              searchAddress={address}
              saveNewSearchAddress={null}
            />
          </div>
        </section>
      );
    } else {
      return (
        <section className='modal-card-body'>
          <p className='page-msg'>
            <i className='fa fa-spinner fa-spin fa-3x fa-fw'></i>
            <span className='sr-only'>Loading...</span>
          </p>
        </section>
      );
    }
  }

  render() {
    const { modals, toggleModal, modalValues } = this.props;
    return (
      <div className={modals.officeModal ? 'modal is-active' : 'modal'}>
        <div className='modal-background' onClick={toggleModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>
              { modalValues.action === '_new' ? 'New Office' : 'Edit Office' }
            </p>
            <button className='delete' onClick={toggleModal}></button>
          </header>
          { this._renderModalBody() }
          <footer className='modal-card-foot'>
            <button className='button is-primary' onClick={toggleModal}>Submit</button>
            <button className='button' onClick={toggleModal}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}
