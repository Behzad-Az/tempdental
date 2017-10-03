import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { empToggleModal } from 'actions/EmployerPage/ControlBar';
import GoogleMapWindow from '../ApplicantPage/GoogleMapWindow.jsx';
import moment from 'moment';

@connect()

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
    this._showEditModal = this._showEditModal.bind(this);
  }

  _findDateInfo(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'];
    const momentObj = moment(date.slice(0,10), 'YYYY-MM-DD');
    return `${days[momentObj.weekday()]}, ${months[momentObj.month()]} ${momentObj.date()} ${momentObj.year()}`;
  }

  _renderVacancyDates() {
    const { posting, dates } = this.props;
    if (posting.type === 'Temp') {
      return dates.map(dateRow =>
        <p key={dateRow.id}>
          <i className='fa fa-calendar' /> {this._findDateInfo(dateRow.start_date)} to {this._findDateInfo(dateRow.end_date)}
        </p>
      );
    } else {
      return (
        <p>
          <i className='fa fa-calendar' /> {this._findDateInfo(dates[0].start_date)} (expected start date)
        </p>
      );
    }
  }

  _findTimePassed(date) {
    return moment(date.slice(0,10), 'YYYY-MM-DD').fromNow();
  }

  _showEditModal() {
    const { posting, dates, dispatch } = this.props;

    const modalValues = {
      action: '_edit',
      startDate: moment(dates[0].start_date.slice(0, 10), 'YYYY-MM-DD'),
      endDate: moment(dates[0].end_date.slice(0, 10), 'YYYY-MM-DD'),
      title: posting.title,
      description: posting.description,
      type: posting.type,
      anonymous: posting.anonymous,
      officeId: posting.office_id,
      postingId: posting.id,
      modalName: 'postingModal'
    };

    dispatch(
      empToggleModal(modalValues)
    );
  }

  render() {
    const { type, officeName, address, description, created_at, title, lat, lng, anonymous } = this.props.posting;
    return (
      <div className='box posting-row'>
        <article className='media'>
          <div className='media-content'>
            <div className='content'>
              <div>
                <strong>
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
                { anonymous && <p>*This posting was listed anonymously</p> }
              </div>
            </div>
          </div>
          <div className='media-right'>
            <div className='map-container '>
              <GoogleMapWindow lat={lat} lng={lng} />
            </div>
            <div className='btn-container'>
              <button
                className='button edit-btn'
                onClick={this._showEditModal}>
                Edit Posting
              </button>
            </div>
          </div>
        </article>
      </div>
    );
  }
}
