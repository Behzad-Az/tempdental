import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { empToggleModal } from 'actions/EmployerPage/ControlBar';
import GoogleMapWindow from 'components/ApplicantPage/GoogleMapWindow.jsx';
import moment from 'moment';

@connect(state => ({
  applCounts: state.empPostings.get('applCounts')
}))

export default class PostingRow extends Component {

  static propTypes = {
    posting: PropTypes.object,
    applCounts: PropTypes.array,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._findDateInfo = this._findDateInfo.bind(this);
    this._renderDates = this._renderDates.bind(this);
    this._findTimePassed = this._findTimePassed.bind(this);
    this._setUpPostingModal = this._setUpPostingModal.bind(this);
    this._setUpDeleteModal = this._setUpDeleteModal.bind(this);
    this._setUpApplicantListModal = this._setUpApplicantListModal.bind(this);
    this._renderApplicationBtn = this._renderApplicationBtn.bind(this);
    this._renderNewApplNotif = this._renderNewApplNotif.bind(this);
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
      <p><i className='fa fa-calendar' /> {this._findDateInfo(start_date)} (start date)</p>;
  }

  _findTimePassed(date) {
    return moment(date.slice(0, 10), 'YYYY-MM-DD').fromNow();
  }

  _setUpPostingModal() {
    const { posting, dispatch } = this.props;
    const { start_date, end_date, title, description, type, anonymous, office_id, id } = posting;
    const modalValues = {
      action: '_edit',
      startDate: moment(start_date.slice(0, 10), 'YYYY-MM-DD'),
      endDate: type === 'Temp' ? moment(end_date.slice(0, 10), 'YYYY-MM-DD') : null,
      title,
      description,
      type,
      anonymous,
      officeId: office_id,
      postingId: id,
      modalName: 'postingModal'
    };
    dispatch(empToggleModal(modalValues));
  }

  _setUpDeleteModal() {
    const { posting, dispatch } = this.props;
    const modalValues = {
      vacancyId: posting.id,
      modalName: 'deletePostingModal'
    };
    dispatch(empToggleModal(modalValues));
  }

  _setUpApplicantListModal() {
    const { posting, dispatch } = this.props;
    const { id, title, officeName } = posting;
    const modalValues = {
      vacancyId: id,
      title,
      officeName,
      modalName: 'applicantListModal'
    };
    dispatch(empToggleModal(modalValues));
  }

  _renderApplicationBtn() {
    const { applCounts, posting } = this.props;
    const applCount = applCounts.reduce((acc, appl) => appl.vacancy_id === posting.id ? acc + 1 : acc, 0);
    if (applCount) {
      return (
        <button className='button edit' onClick={this._setUpApplicantListModal}>
          <i className='fa fa-user' /> {applCount} {applCount > 1 ? 'Applicants' : 'Applicant'}
        </button>
      );
    } else {
      return (
        <button className='button edit' onClick={this._setUpApplicantListModal} disabled>
          <i className='fa fa-user' /> No Applicant
        </button>
      );
    }
  }

  _renderNewApplNotif() {
    const { applCounts, posting } = this.props;
    const newApplCount = applCounts.reduce((acc, appl) => appl.vacancy_id === posting.id && !appl.employer_viewed ? acc + 1 : acc, 0);
    if (newApplCount) {
      return (
        <p className='new-appl-notif'>
          <span onClick={this._setUpApplicantListModal}><i className='fa fa-circle' />{newApplCount} {newApplCount > 1 ? 'New Applicants' : 'New Applicant'}</span>
          <br />
        </p>
      );
    }
  }

  render() {
    const { type, officeName, address, description, created_at, title, lat, lng, anonymous } = this.props.posting;
    return (
      <div className='box posting-row'>
        <article className='media'>
          <div className='media-content'>
            <div className='content'>
              { this._renderNewApplNotif() }
              <div>
                <strong>
                  [{type}] {title}
                </strong>
                <br />
                <strong>
                  <Link to={`https://www.google.com/maps/place/${address}`} target='_blank'>
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
                <i className='fa fa-clock-o' />9AM to 5PM
                <br />
                <Link to={`https://www.google.com/maps/place/${address}`} target='_blank'>
                  <i className='fa fa-map-marker' />{address}
                </Link>
                <br />
                { anonymous && <p><i className='fa fa-user-secret' />Anonymous Posting</p> }
                Created { this._findTimePassed(created_at) }
              </div>
            </div>
          </div>
          <div className='media-right'>
            <div className='map-container'>
              <GoogleMapWindow lat={lat} lng={lng} />
            </div>
            <div className='btn-container'>
              { this._renderApplicationBtn() }
              <button
                className='button edit'
                onClick={this._setUpPostingModal}>
                <i className='fa fa-pencil' />Edit
              </button>
              <button
                className='button remove'
                onClick={this._setUpDeleteModal}>
                <i className='fa fa-trash' />Remove
              </button>
            </div>
          </div>
        </article>
      </div>
    );
  }
}
