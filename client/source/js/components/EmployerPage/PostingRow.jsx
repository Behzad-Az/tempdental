import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { applApplyOrWithDraw } from 'actions/ApplicantPage/Vacancies';
import { Link } from 'react-router-dom';
import GoogleMapWindow from '../ApplicantPage/GoogleMapWindow.jsx';
import moment from 'moment';

export default class PostingRow extends Component {

  static propTypes = {
    posting: PropTypes.object,
    dates: PropTypes.array,
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

  _renderVacancyDates() {
    if (this.props.posting.type === 'Temp') {
      return this.props.dates.map((dateRow, index) => <p key={index}><i className='fa fa-calendar' /> {this._findDateInfo(dateRow.start_date)} to {this._findDateInfo(dateRow.end_date)}</p>);
    } else {
      return <p><i className='fa fa-calendar' /> {this._findDateInfo(this.props.dates[0].start_date)} (expected start date)</p>;
    }
  }

  _findTimePassed(date) {
    return moment(date.slice(0,10), 'YYYY-MM-DD').fromNow();
  }

  _handleApply() {
    // fetch('/api/applicant/applications', {
    //   method: 'POST',
    //   credentials: 'same-origin',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ vacancyId: this.props.posting.id })
    // })
    // .then(response => response.ok ?
    //   this.props.dispatch(applApplyOrWithDraw({ action: 'apply', vacancyId: this.props.posting.id })) :
    //   null
    // )
    // .catch(console.error);
  }

  _handleWithdrawApplication() {
    // fetch(`/api/applicant/applications?vacancyId=${this.props.posting.id}`, {
    //   method: 'DELETE',
    //   credentials: 'same-origin',
    //   headers: {
    //     'Accept': 'application/string',
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => response.ok ?
    //   this.props.dispatch(applApplyOrWithDraw({ action: 'withdraw', vacancyId: this.props.posting.id })) :
    //   null
    // )
    // .catch(console.error);
  }

  render() {
    return (

      <div className='box posting-row'>
        <article className='media'>
          <div className='media-content'>
            <div className='content'>
              <div>
                <strong>
                  [{this.props.posting.type}] {this.props.posting.title}
                </strong>
                <br />
                <strong>
                  <Link to={`https://www.google.com/maps/place/${this.props.posting.address.replace(/ /g,"+")}`} target='_blank'>
                    @{this.props.posting.officeName}
                  </Link>
                </strong>
                <hr />
                <strong>
                  Qualifications:
                </strong>
                <br />
                {this.props.posting.description}
                <hr />

                <strong>
                  Vacancy Dates:
                </strong>
                <br />
                { this._renderVacancyDates() }
                <hr />
                <i className='fa fa-clock-o' /> 9AM to 5PM
                <br />
                <Link to={`https://www.google.com/maps/place/${this.props.posting.address.replace(/ /g,"+")}`} target='_blank'>
                  <i className='fa fa-map-marker' /> {this.props.posting.address}
                </Link>
                <br />
                Created { this._findTimePassed(this.props.posting.created_at) }
              </div>
            </div>
          </div>

          <div className='media-right'>
            <div className='map-container '>
              <GoogleMapWindow lat={this.props.posting.lat} lng={this.props.posting.lng} />
            </div>
            <div className='btn-container'>
              <button
                className='button edit-btn'
                onClick={this.props.alreadyApplied ? this._handleWithdrawApplication : this._handleApply}
              >
                Edit Posting
              </button>
            </div>
          </div>

        </article>
      </div>

    );
  }
}
