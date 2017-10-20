import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { applApplyOrWithdraw } from 'actions/ApplicantPage/Vacancies';
import { Link } from 'react-router-dom';
import GoogleMapWindow from './GoogleMapWindow.jsx';
import moment from 'moment';

@connect()

export default class VacancyRow extends Component {

  static propTypes = {
    vacancy: PropTypes.object,
    alreadyApplied: PropTypes.bool,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._findDateInfo = this._findDateInfo.bind(this);
    this._renderDates = this._renderDates.bind(this);
    this._findTimePassed = this._findTimePassed.bind(this);
    this._handleApply = this._handleApply.bind(this);
    this._handleWithdrawApplication = this._handleWithdrawApplication.bind(this);
  }

  _findDateInfo(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'];
    const momentObj = moment(date.slice(0,10), 'YYYY-MM-DD');
    return `${days[momentObj.weekday()]}, ${months[momentObj.month()]} ${momentObj.date()} ${momentObj.year()}`;
  }

  _findTimePassed(date) {
    return moment(date.slice(0,10), 'YYYY-MM-DD').fromNow();
  }

  _renderDates() {
    const { type, start_date, end_date } = this.props.vacancy;
    return type === 'Temp' ?
      <p><i className='fa fa-calendar' /> {this._findDateInfo(start_date)} to {this._findDateInfo(end_date)}</p> :
      <p><i className='fa fa-calendar' /> {this._findDateInfo(start_date)} (expected start date)</p>;
  }

  _handleApply() {
    const { dispatch, vacancy } = this.props;
    fetch('/api/applicant/applications', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ vacancyId: vacancy.id })
    })
    .then(response => response.ok ?
      dispatch(applApplyOrWithdraw({ action: 'apply', vacancyId: vacancy.id })) :
      null
    )
    .catch(console.error);
  }

  _handleWithdrawApplication() {
    const { dispatch, vacancy } = this.props;
    fetch(`/api/applicant/applications/${vacancy.id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/string',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.ok ?
      dispatch(applApplyOrWithdraw({ action: 'withdraw', vacancyId: vacancy.id })) :
      null
    )
    .catch(console.error);
  }

  render() {

    const { alreadyApplied } = this.props;
    const { type, title, officeName, description, address, created_at, anonymous, lat, lng } = this.props.vacancy;
    const blurred = anonymous ? 'blurred' : '';

    return (

      <div className='box vacancy-row'>

        <article className='media'>

          <div className='media-content'>

            <div className='content'>
              <div>
                <strong>
                  [{type}] {title}
                </strong>
                <br />
                <strong className={blurred}>
                  <Link to={`https://www.google.com/maps/place/${address.replace(/ /g,"+")}`} target='_blank'>
                    @{officeName}
                  </Link>
                </strong>
                <hr />
                <strong>
                  Qualifications:
                </strong>
                <br />
                {description}
                <hr />

                <strong>
                  When?
                </strong>
                <br />
                { this._renderDates() }
                <hr />
                <i className='fa fa-clock-o' /> 9AM to 5PM
                <br />
                <Link to={`https://www.google.com/maps/place/${address.replace(/ /g,"+")}`} target='_blank'>
                  <i className='fa fa-map-marker' /> {address}
                </Link>
                <br />
                Created { this._findTimePassed(created_at) }
              </div>

            </div>

          </div>

          <div className='media-right'>
            <div className={`map-container ${blurred}`}>
              <GoogleMapWindow lat={lat} lng={lng} />
            </div>
            <div className='btn-container'>
              <button
                className={alreadyApplied ? 'button apply-btn is-warning' : 'button apply-btn'}
                onClick={alreadyApplied ? this._handleWithdrawApplication : this._handleApply}
              >
                {alreadyApplied ? 'Withdraw Application' : 'Apply Now!'}
              </button>
            </div>
          </div>

        </article>
      </div>

    );
  }
}
