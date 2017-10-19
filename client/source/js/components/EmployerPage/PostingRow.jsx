import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { empToggleModal } from 'actions/EmployerPage/ControlBar';
import GoogleMapWindow from 'components/ApplicantPage/GoogleMapWindow.jsx';
import moment from 'moment';

@connect()

export default class PostingRow extends Component {

  static propTypes = {
    posting: PropTypes.object,
    applicantCount: PropTypes.number,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._findDateInfo = this._findDateInfo.bind(this);
    this._renderDates = this._renderDates.bind(this);
    this._findTimePassed = this._findTimePassed.bind(this);
    this._setUpEditModal = this._setUpEditModal.bind(this);
    this._setUpDeleteModal = this._setUpDeleteModal.bind(this);
    this._getApplicants = this._getApplicants.bind(this);
  }

  _findDateInfo(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'];
    const momentObj = moment(date.slice(0,10), 'YYYY-MM-DD');
    return `${days[momentObj.weekday()]}, ${months[momentObj.month()]} ${momentObj.date()} ${momentObj.year()}`;
  }

  _renderDates() {
    const { type, start_date, end_date } = this.props.posting;
    return type === 'Temp' ?
      <p><i className='fa fa-calendar' /> {this._findDateInfo(start_date)} to {this._findDateInfo(end_date)}</p> :
      <p><i className='fa fa-calendar' /> {this._findDateInfo(start_date)} (expected start date)</p>;
  }

  _findTimePassed(date) {
    return moment(date.slice(0, 10), 'YYYY-MM-DD').fromNow();
  }

  _setUpEditModal() {
    const { start_date, end_date, title, description, type, anonymous, office_id, id } = this.props.posting;
    const modalValues = {
      action: '_edit',
      startDate: moment(start_date.slice(0, 10), 'YYYY-MM-DD'),
      endDate: moment(end_date.slice(0, 10), 'YYYY-MM-DD'),
      title,
      description,
      type,
      anonymous,
      officeId: office_id,
      postingId: id,
      modalName: 'postingModal'
    };
    this.props.dispatch(empToggleModal(modalValues));
  }

  _setUpDeleteModal() {
    const { posting, dispatch } = this.props;
    const modalValues = {
      vacancyId: posting.id,
      modalName: 'deletePostingModal'
    };
    dispatch(empToggleModal(modalValues));
  }

  _getApplicants() {
    fetch(`/api/employer/vacancies/${this.props.posting.id}/applicants`, {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .catch(console.error);
  }

  render() {
    const { applicantCount } = this.props;
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
                className='button edit'
                onClick={this._setUpEditModal}>
                <i className='fa fa-pencil' />
              </button>
              <button
                className='button remove'
                onClick={this._setUpDeleteModal}>
                <i className='fa fa-trash' />
              </button>
              <button
                className='button edit'
                onClick={this._getApplicants}
                disabled={!applicantCount}>
                <i className='fa fa-user' /> {applicantCount} Applicants
              </button>


            </div>
          </div>
        </article>
      </div>
    );
  }
}
