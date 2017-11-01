import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { empDeleteAppl } from 'actions/EmployerPage/Applications';
import { empDecrementApplCount } from 'actions/EmployerPage/Postings';

@connect()

export default class PostingModal extends Component {
  static propTypes = {
    appl: PropTypes.object,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._handleDeleteAppl = this._handleDeleteAppl.bind(this);
  }

  _handleDeleteAppl() {
    const { dispatch, appl } = this.props;
    fetch(`/api/employer/applications/${appl.id}?vacancy_id=${appl.vacancy_id}&candidate_id=${appl.candidate_id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/string',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        dispatch(empDeleteAppl(appl.id))
        dispatch(empDecrementApplCount(appl.id));
      }
    })
    .catch(console.error);
  }

  render() {
    const { name, prefix, email, phone, intro, employer_viewed } = this.props.appl;
    return (
      <div className='box applicantion-row'>
        <article className='media'>
          <div className='media-left'>
            <figure className='image is-64x64'>
              <img src='https://bulma.io/images/placeholders/128x128.png' alt='Image' />
            </figure>
          </div>
          <div className='media-content'>

            <button className='button delete is-dark' onClick={this._handleDeleteAppl} />

            <div className='content'>
              <p>
                <strong>
                  {prefix} {name} { !employer_viewed && <span className='is-italic'> - New!</span>}
                </strong>
                <br />
                {intro}
              </p>
            </div>

            <div className='btns-row'>
              <button className='button is-small'>
                <span className='icon is-small'>
                  <i className='fa fa-file-text-o'></i>
                </span>
                <span>Resume</span>
              </button>
              <button className='button is-small'>
                <span className='icon is-small'>
                  <i className='fa fa-phone'></i>
                </span>
                <span>{phone}</span>
              </button>
              <button className='button is-small'>
                <span className='icon is-small'>
                  <i className='fa fa-envelope-o'></i>
                </span>
                <span>{email}</span>
              </button>
            </div>

          </div>
        </article>
      </div>
    );
  }
}
