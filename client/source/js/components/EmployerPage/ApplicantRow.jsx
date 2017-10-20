import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

@connect()

export default class PostingModal extends Component {
  static propTypes = {
    applicant: PropTypes.object,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
  }

  render() {
    const { name, prefix, email, phone, intro } = this.props.applicant;
    return (
      <div className='box applicant-row'>
        <article className='media'>
          <div className='media-left'>
            <figure className='image is-64x64'>
              <img src='https://bulma.io/images/placeholders/128x128.png' alt='Image' />
            </figure>
          </div>
          <div className='media-content'>

            <button className='button delete is-danger' />

            <div className='content'>
              <p>
                <strong>
                  {prefix} {name}
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
