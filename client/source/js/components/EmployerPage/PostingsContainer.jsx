import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { empGetPostings } from 'actions/EmployerPage/Postings';
import PostingRow from './PostingRow.jsx';

@connect(state => ({
  dataLoaded: state.empPostings.get('dataLoaded'),
  pageError: state.empPostings.get('pageError'),
  postings: state.empPostings.get('postings'),
  vacancyDates: state.empPostings.get('vacancyDates'),
  selectedOffices: state.empControlBar.get('selectedOffices')
}))

export default class PostingsContainer extends Component {
  static propTypes = {
    dataLoaded: PropTypes.bool,
    pageError: PropTypes.bool,
    postings: PropTypes.array,
    vacancyDates: PropTypes.array,
    selectedOffices: PropTypes.array,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._renderPostingRows = this._renderPostingRows.bind(this);
    this._renderCompAfterData = this._renderCompAfterData.bind(this);
  }

  componentDidMount() {
    document.title = 'Employer Page';
    this.props.dispatch(empGetPostings());
  }

  _renderPostingRows() {
    const { selectedOffices, postings, vacancyDates } = this.props;
    const filteredPostings = selectedOffices.length ?
                     postings.filter(posting => selectedOffices.includes(posting.office_id)) :
                     postings;
    // return filteredPostings.map(posting =>
    //   <PostingRow
    //     key={posting.id}
    //     posting={posting}
    //     dates={vacancyDates.filter(date => date.vacancy_id === posting.id)} />
    // );
    if (filteredPostings.length) {
      return filteredPostings.map(posting =>
        <PostingRow
          key={posting.id}
          posting={posting}
          dates={vacancyDates.filter(date => date.vacancy_id === posting.id)} />
      );
    } else {
      return <p className='has-text-centered'>No posting found.</p>;
    }
  }

  _renderCompAfterData() {
    const { dataLoaded, pageError } = this.props;
    if (dataLoaded && pageError) {
      return (
        <p className='page-msg'>
          <i className='fa fa-exclamation-triangle' aria-hidden='true' />
          Error in loading up the page
        </p>
      );
    } else if (dataLoaded) {
      return (
        <div className='postings-container'>
          <h1 className='header'>
            Postings:
            <i className='fa fa-angle-down' aria-hidden='true' />
          </h1>
          { this._renderPostingRows() }
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
