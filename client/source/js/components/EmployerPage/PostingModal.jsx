import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { empModalHandleChng } from 'actions/EmployerPage/ControlBar';

@connect(state => ({
  modals: state.empControlBar.get('modals'),
  editedPostingId: state.empControlBar.get('editedPostingId'),
  offices: state.empControlBar.get('offices'),
  modalValues: state.empControlBar.get('modalValues')
}))

export default class PostingModal extends Component {
  static propTypes = {
    modals: PropTypes.object,
    editedPostingId: PropTypes.string,
    offices: PropTypes.array,
    modalValues: PropTypes.object,
    toggleModal: PropTypes.func,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._renderModalBody = this._renderModalBody.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  _renderModalBody() {
    if (this.props.editedPostingId) {
      return (
        <section className='modal-card-body'>

          <div className='field'>
            <label className='label'>
              Select Office Location:
            </label>
            <div className='control'>
              <span className='select'>
                <select name='officeId' onChange={this._handleChange}>
                  <option value=''>-</option>
                  { this.props.offices.map(office => <option key={office.id} value={office.id}>{office.name}</option> ) }
                </select>
              </span>
            </div>
          </div>

          <div className='field'>
            <label className='label'>
              Position Title:
            </label>
            <p className='control'>
              <input
                className='input'
                type='text'
                name='title'
                defaultValue={this.props.modalValues.title}
                placeholder='Example: Temporary Dental Assistant'
                onChange={this._handleChange} />
            </p>
          </div>

          <div className='field is-grouped'>
            <div className='control'>
              <label className='label'>
                Start Date:
              </label>
              <DatePicker
                selected={moment()}
                selectsStart
                isClearable
                inline
                placeholderText='Pick start date'
                minDate={moment()}
                maxDate={moment().add(6, 'months')}
                startDate={moment()}
                endDate={moment().add(6, 'months')}
                onChange={null}
              />
            </div>
            <div className='control'>
              <label className='label'>
                End Date:
              </label>
              <DatePicker
                selected={moment()}
                selectsStart
                isClearable
                inline
                placeholderText='Pick start date'
                minDate={moment()}
                maxDate={moment().add(6, 'months')}
                startDate={moment()}
                endDate={moment().add(6, 'months')}
                onChange={null}
              />
            </div>
          </div>

          <div className='field'>
            <label className='label'>
              Position Description and Requirements:
            </label>
            <p className='control'>
              <textarea
                className='textarea'
                name='description'
                defaultValue={this.props.modalValues.description}
                placeholder='Example: blah blah blah blah blah'
                onChange={this._handleChange} />
            </p>
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

  _handleChange(event) {
    this.props.dispatch(empModalHandleChng(event));
  }

  _validateForm() {
    return true;
  }

  _handleNewVacancyPost() {
    // const data = {
    //   startDate: this.state.startDate.format('YYYY-MM-DD'),
    //   endDate: this.state.endDate.format('YYYY-MM-DD'),
    //   title: this.state.title,
    //   description: this.state.description,
    //   officeId: this.state.officeId
    // };

    // fetch('/api/vacancies', {
    //   method: 'POST',
    //   credentials: 'same-origin',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(resJSON => console.log("i'm here 0: ", resJSON))
    // .catch(console.error)
    // .then(this.props.toggleModal);
  }

  render() {
    console.log("i'm here 0: ", this.props.modalValues);
    return (
      <div className={this.props.modals.postingModal ? 'modal is-active' : 'modal'}>
        <div className='modal-background' onClick={this.props.toggleModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>New Posting</p>
            <button className='delete' onClick={this.props.toggleModal}></button>
          </header>
          { this._renderModalBody() }
          <footer className='modal-card-foot'>
            <button className='button is-primary' disabled={!this._validateForm()} onClick={this._handleNewVacancyPost}>Submit</button>
            <button className='button' onClick={this.props.toggleModal}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}
