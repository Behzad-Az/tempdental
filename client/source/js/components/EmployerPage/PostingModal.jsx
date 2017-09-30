import React, {Component} from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

@connect(state => ({
  showPostingModal: state.empControlBar.get('showPostingModal'),
  editedPostingId: state.empControlBar.get('editedPostingId'),
  postings: state.empPostings.get('postings')
}))

export default class PostingModal extends Component {
  constructor(props) {
    super(props);
    // this.formLimits = {
    //   title: { min: 3, max: 30 },
    //   description: { min: 5, max: 500 }
    // };
    // this.state = {
    //   startDate: moment().subtract(5, 'days'),
    //   endDate: null,
    //   title: '',
    //   description: '',
    //   officeId: ''
    // };
    // this._handleChange = this._handleChange.bind(this);
    // this._validateForm = this._validateForm.bind(this);
    // this._handleNewVacancyPost = this._handleNewVacancyPost.bind(this);
  }

  _handleChange(e) {
    // let state = {};
    // state[e.target.name] = e.target.value;
    // this.setState(state);
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
    return (
      <div className={this.props.showPostingModal ? 'modal is-active' : 'modal'}>
        <div className='modal-background' onClick={this.props.toggleModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>New Vacancy</p>
            <button className='delete' onClick={this.props.toggleModal}></button>
          </header>
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

            <div className='field is-grouped'>
              <div className='control'>
                <label className='label'>
                  Start Date:
                </label>
                <DatePicker
                  selected={this.state.startDate}
                  selectsStart
                  isClearable
                  inline
                  placeholderText='Pick start date'
                  minDate={moment()}
                  maxDate={this.state.endDate || moment().add(6, 'months')}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={startDate => this.setState({ startDate })}
                />
              </div>
              <div className='control'>
                <label className='label'>
                  End Date:
                </label>
                <DatePicker
                  selected={this.state.endDate}
                  selectsEnd
                  isClearable
                  inline
                  placeholderText='Pick end date'
                  minDate={this.state.startDate || moment()}
                  maxDate={moment().add(6, 'months')}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={endDate => this.setState({ endDate })}
                />
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
                  placeholder='Example: Temporary Dental Assistant' />
              </p>
            </div>

            <div className='field'>
              <label className='label'>
                Position Description and Requirements:
              </label>
              <p className='control'>
                <textarea
                  className='textarea'
                  name='description'
                  placeholder='Example: blah blah blah blah blah' />
              </p>
            </div>

          </section>
          <footer className='modal-card-foot'>
            <button className='button is-primary' disabled={!this._validateForm()} onClick={this._handleNewVacancyPost}>Submit</button>
            <button className='button' onClick={this.props.toggleModal}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}
