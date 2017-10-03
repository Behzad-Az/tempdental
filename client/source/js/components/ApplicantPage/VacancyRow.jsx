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
    dates: PropTypes.array,
    alreadyApplied: PropTypes.bool,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._findDateInfo = this._findDateInfo.bind(this);
    this._renderVacancyDates = this._renderVacancyDates.bind(this);
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

  _renderVacancyDates() {
    if (this.props.vacancy.type === 'Temp') {
      return this.props.dates.map(dateRow => <p key={dateRow.id}><i className='fa fa-calendar' /> {this._findDateInfo(dateRow.start_date)} to {this._findDateInfo(dateRow.end_date)}</p>);
    } else {
      return <p><i className='fa fa-calendar' /> {this._findDateInfo(this.props.dates[0].start_date)} (expected start date)</p>;
    }
  }

  _handleApply() {
    const { dispatch } = this.props;
    fetch('/api/applicant/applications', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ vacancyId: this.props.vacancy.id })
    })
    .then(response => response.ok ?
      this.props.dispatch(applApplyOrWithdraw({ action: 'apply', vacancyId: this.props.vacancy.id })) :
      null
    )
    .catch(console.error);
  }

  _handleWithdrawApplication() {
    fetch(`/api/applicant/applications?vacancyId=${this.props.vacancy.id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/string',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.ok ?
      this.props.dispatch(applApplyOrWithdraw({ action: 'withdraw', vacancyId: this.props.vacancy.id })) :
      null
    )
    .catch(console.error);
  }

  render() {

    const { type, title, officeName, description, address, created_at, anonymous } = this.props.vacancy;

    return (

      <div className='box vacancy-row'>

        <article className='media'>

          <div className='media-content'>

            <div className='content'>
              <div>
                <strong className={anonymous ? 'blurred' : null}>
                  [{type}] {title}
                </strong>
                <br />
                <strong>
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
                  Vacancy Dates:
                </strong>
                <br />
                { this._renderVacancyDates() }
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
            <div className='map-container '>
              <GoogleMapWindow lat={this.props.vacancy.lat} lng={this.props.vacancy.lng} />
            </div>
            <div className='btn-container'>
              <button
                className={this.props.alreadyApplied ? 'button apply-btn is-warning' : 'button apply-btn'}
                onClick={this.props.alreadyApplied ? this._handleWithdrawApplication : this._handleApply}
              >
                {this.props.alreadyApplied ? 'Withdraw Application' : 'Apply Now!'}
              </button>
            </div>
          </div>

        </article>
      </div>

    );
  }
}
