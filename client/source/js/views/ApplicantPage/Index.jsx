import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { applLoadVacancies } from 'actions/ApplicantPage/Vacancies';
import VacancyRow from 'components/ApplicantPage/VacancyRow.jsx';
import ControlBar from 'components/ApplicantPage/ControlBar.jsx';

@connect(state => ({
  dataLoaded: state.applVacancies.get('dataLoaded'),
  pageError: state.applVacancies.get('pageError'),
  startDate: state.applVacancies.get('startDate'),
  endDate: state.applVacancies.get('endDate'),
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
  searchFT: state.applControlBar.get('searchFT'),
  searchPT: state.applControlBar.get('searchPT'),
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
    searchFT: PropTypes.bool,
    searchPT: PropTypes.bool,
    searchTemp: PropTypes.bool,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._loadFreshPageDataAuto = this._loadFreshPageDataAuto.bind(this);
    this._concatPageData = this._concatPageData.bind(this);
    this._renderLoadMoreBtn = this._renderLoadMoreBtn.bind(this);
    this._toggleControlBar = this._toggleControlBar.bind(this);
    this._renderCompAfterData = this._renderCompAfterData.bind(this);
  }

  componentDidMount() {
    document.title = 'WTH MAN!';
    this._loadFreshPageDataAuto();
  }

  _loadFreshPageDataAuto() {
    const { dispatch } = this.props;
    dispatch(applLoadVacancies({
      freshReload: true,
      offsetQuery: 0,
      manualSearch: false,
      startDate: this.props.startDate,
      endDate: this.props.endDate
    }));
  }

  _concatPageData() {
    const { dispatch } = this.props;
    let jobTypeArr = [];
    this.props.searchFT ? jobTypeArr.push('FT') : null;
    this.props.searchPT ? jobTypeArr.push('PT') : null;
    this.props.searchTemp ? jobTypeArr.push('Temp') : null;

    dispatch(applLoadVacancies({
      freshReload: false,
      offsetQuery: this.props.vacancies.length,
      manualSearch: this.props.manualSearch,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      searchLat: this.props.searchLat,
      searchLng: this.props.searchLng,
      searchDistance: this.props.searchDistance,
      jobTypeArr
    }));
  }

  _renderLoadMoreBtn() {
    if (this.props.vacancies.length) {
      const btnContent = this.props.noMoreVacancies && this.props.vacancies.length ? 'No more vacancy available' : 'Load more';
      return (
        <p className='end-msg'>
          <button className='button' disabled={this.props.noMoreVacancies} onClick={this._concatPageData}>{btnContent}</button>
        </p>
      );
    } else {
      return <p className='has-text-centered'>No vacancy matching search criteria.</p>;
    }
  }

  _toggleControlBar() {
    const controlBar = document.getElementById('control-bar');
    controlBar.classList.contains('is-open') ? controlBar.classList.remove('is-open') : controlBar.classList.add('is-open');
  }

  _renderCompAfterData() {
    if (this.props.dataLoaded && this.props.pageError) {
      return (
        <div className='main-container'>
          <p className='page-msg'>
            <i className='fa fa-exclamation-triangle' aria-hidden='true' />
            Error in loading up the page
          </p>
        </div>
      );
    } else if (this.props.dataLoaded) {
      return (
        <div className='main-container'>
          <div className='vacancies-container'>
            <h1 className='header'>
              Vacancies:
              <i className='fa fa-angle-down' aria-hidden='true' />
            </h1>
            {
              this.props.vacancies.map(vacancy =>
                <VacancyRow
                  key={vacancy.id}
                  vacancy={vacancy}
                  dates={this.props.vacancyDates.filter(date => date.vacancy_id === vacancy.id)}
                  alreadyApplied={this.props.userApplications.includes(vacancy.id)} />
              )
            }
            { this._renderLoadMoreBtn() }
          </div>
        </div>
      );
    } else {
      return (
        <div className='main-container'>
          <p className='page-msg'>
            <i className='fa fa-spinner fa-spin fa-3x fa-fw'></i>
            <span className='sr-only'>Loading...</span>
          </p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className='applicant-page'>
        <div className='hamburger'>
          <i className='fa fa-navicon' onClick={this._toggleControlBar} />
        </div>
        <ControlBar />
        { this._renderCompAfterData() }
      </div>
    );
  }
};
