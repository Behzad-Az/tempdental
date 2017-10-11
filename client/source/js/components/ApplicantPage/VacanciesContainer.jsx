import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { applLoadVacancies } from 'actions/ApplicantPage/Vacancies';
import VacancyRow from 'components/ApplicantPage/VacancyRow.jsx';
import ControlBar from 'components/ApplicantPage/ControlBar.jsx';

@connect(state => ({
  dataLoaded: state.applVacancies.get('dataLoaded'),
  pageError: state.applVacancies.get('pageError'),
  startDate: state.applControlBar.get('startDate'),
  endDate: state.applControlBar.get('endDate'),
  userApplications: state.applVacancies.get('userApplications'),
  vacancies: state.applVacancies.get('vacancies'),
  vacancyDates: state.applVacancies.get('vacancyDates'),
  noMoreVacancies: state.applVacancies.get('noMoreVacancies'),
  manualSearch: state.applVacancies.get('manualSearch'),
  asyncLoading: state.applVacancies.get('asyncLoading'),
  asyncError: state.applVacancies.get('asyncError'),
  searchLat: state.applControlBar.get('searchLat'),
  searchLng: state.applControlBar.get('searchLng'),
  searchAddress: state.applControlBar.get('searchAddress'),
  searchDistance: state.applControlBar.get('searchDistance'),
  searchFt: state.applControlBar.get('searchFt'),
  searchPt: state.applControlBar.get('searchPt'),
  searchTemp: state.applControlBar.get('searchTemp')
}))

export default class VacanciesContainer extends Component {
  static propTypes = {
    dataLoaded: PropTypes.bool,
    pageError: PropTypes.bool,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    userApplications: PropTypes.array,
    vacancies: PropTypes.array,
    vacancyDates: PropTypes.array,
    noMoreVacancies: PropTypes.bool,
    manualSearch: PropTypes.bool,
    searchLat: PropTypes.number,
    searchLng: PropTypes.number,
    searchAddress: PropTypes.string,
    searchDistance: PropTypes.number,
    searchFt: PropTypes.bool,
    searchPt: PropTypes.bool,
    searchTemp: PropTypes.bool,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._loadFreshPageDataAuto = this._loadFreshPageDataAuto.bind(this);
    this._concatPageData = this._concatPageData.bind(this);
    this._renderLoadMoreBtn = this._renderLoadMoreBtn.bind(this);
    this._renderCompAfterData = this._renderCompAfterData.bind(this);
  }

  componentDidMount() {
    this._loadFreshPageDataAuto();
  }

  _loadFreshPageDataAuto() {
    const { dispatch, startDate, endDate } = this.props;
    dispatch(applLoadVacancies({
      freshReload: true,
      offsetQuery: 0,
      manualSearch: false,
      startDate,
      endDate
    }));
  }

  _concatPageData() {
    const { dispatch, searchFt, searchPt, searchTemp, vacancies, manualSearch, startDate, endDate, searchLat, searchLng, searchDistance } = this.props;
    let jobTypeArr = [];
    searchFt ? jobTypeArr.push('FT') : null;
    searchPt ? jobTypeArr.push('PT') : null;
    searchTemp ? jobTypeArr.push('Temp') : null;

    dispatch(applLoadVacancies({
      freshReload: false,
      offsetQuery: vacancies.length,
      manualSearch: manualSearch,
      startDate: startDate,
      endDate: endDate,
      searchLat: searchLat,
      searchLng: searchLng,
      searchDistance: searchDistance,
      jobTypeArr
    }));
  }

  _renderLoadMoreBtn() {
    const { vacancies, noMoreVacancies } = this.props;
    if (vacancies.length) {
      const btnContent = noMoreVacancies && vacancies.length ? 'No more vacancy available' : 'Load more';
      return (
        <p className='end-msg'>
          <button className='button' disabled={noMoreVacancies} onClick={this._concatPageData}>{btnContent}</button>
        </p>
      );
    } else {
      return <p className='has-text-centered'>No vacancy matching search criteria.</p>;
    }
  }

  _renderCompAfterData() {
    const { dataLoaded, pageError, vacancies, vacancyDates, userApplications, asyncLoading } = this.props;
    if (dataLoaded && pageError) {
      return (
        <p className='page-msg'>
          <i className='fa fa-exclamation-triangle' aria-hidden='true' />
          Error in loading up the page
        </p>
      );
    } else if (dataLoaded) {
      return (
        <div className='vacancies-container'>
          <h1 className='header'>
            Vacancies:
            <i className='fa fa-angle-down' aria-hidden='true' />
          </h1>
          {
            vacancies.map(vacancy =>
              <VacancyRow
                key={vacancy.id}
                vacancy={vacancy}
                dates={vacancyDates.filter(date => date.vacancy_id === vacancy.id)}
                alreadyApplied={userApplications.includes(vacancy.id)} />
            )
          }
          { this._renderLoadMoreBtn() }
        </div>
      );
    } else {
      return (
        <p className='page-msg'>
          <i className='fa fa-spinner fa-spin fa-3x fa-fw'></i>
          <span className='sr-only'>Loading...</span>
        </p>
      );
    }
  }

  render() {
    return (
      <div className='main-container'>
        { this._renderCompAfterData() }
      </div>
    );
  }
};
