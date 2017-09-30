import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoogleAddressBar from 'components/ApplicantPage/GoogleAddressBar.jsx';

@connect(state => ({
  showOfficeModal: state.empControlBar.get('showOfficeModal'),
  editedOfficeId: state.empControlBar.get('editedOfficeId'),
  offices: state.empControlBar.get('offices')
}))

export default class OfficeModal extends Component {
  static propTypes = {
    showOfficeModal: PropTypes.bool,
    editedOfficeId: PropTypes.string,
    offices: PropTypes.array,
    toggleModal: PropTypes.func,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._renderModalBody = this._renderModalBody.bind(this);
  }

  _renderModalBody() {
    let office;
    if (this.props.editedOfficeId === '_new') {
      office = {
        address: '',
        name: '',
        more_info: ''
      };
    } else {
      office = this.props.offices.find(office => office.id === this.props.editedOfficeId);
    }

    if (this.props.editedOfficeId) {
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
                defaultValue={office.name}
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
                defaultValue={office.more_info}
                placeholder='Example: blah blah blah blah blah' />
            </p>
          </div>

          <div className='google-address-bar control'>
            <GoogleAddressBar
              searchAddress={office.address}
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
    const header = this.props.editedOfficeId === '_new'  ? 'New Office' : 'Edit Office';
    return (
      <div className={this.props.showOfficeModal ? 'modal is-active' : 'modal'}>
        <div className='modal-background' onClick={this.props.toggleModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>{header}</p>
            <button className='delete' onClick={this.props.toggleModal}></button>
          </header>
          { this._renderModalBody() }
          <footer className='modal-card-foot'>
            <button className='button is-primary' onClick={this.props.toggleModal}>Submit</button>
            <button className='button' onClick={this.props.toggleModal}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}
