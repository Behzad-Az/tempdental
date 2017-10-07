import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  empGetControlData,
  addRemoveSelectedOffice,
  empToggleModal
} from 'actions/EmployerPage/ControlBar';
import OfficeModal from './OfficeModal.jsx';
import PostingModal from './PostingModal.jsx';
import DeletePostingModal from './DeletePostingModal.jsx';

@connect(state => ({
  dataLoaded: state.empControlBar.get('dataLoaded'),
  pageError: state.empControlBar.get('pageError'),
  offices: state.empControlBar.get('offices'),
  selectedOffices: state.empControlBar.get('selectedOffices'),
  postings: state.empPostings.get('postings')
}))

export default class ControlBar extends Component {
  static propTypes = {
    dataLoaded: PropTypes.bool,
    pageError: PropTypes.bool,
    offices: PropTypes.array,
    selectedOffices: PropTypes.array,
    postings: PropTypes.array,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._handleFilterOffice = this._handleFilterOffice.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
    this._setUpPostingModal = this._setUpPostingModal.bind(this);
    this._setUpOfficeModal = this._setUpOfficeModal.bind(this);
    this._setUpDeletePostingModal = this._setUpDeletePostingModal.bind(this);
    this._renderFilterOfficeRows = this._renderFilterOfficeRows.bind(this);
    this._renderEditOfficeRows = this._renderEditOfficeRows.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(empGetControlData());
  }

  _handleFilterOffice(officeId) {
    this.props.dispatch(addRemoveSelectedOffice(officeId));
  }

  _toggleModal(modalValues) {
    this.props.dispatch(empToggleModal(modalValues));
  }

  _setUpPostingModal() {
    const modalValues = {
      action: '_new',
      startDate: null,
      endDate: null,
      title: null,
      description: null,
      type: null,
      anonymous: false,
      officeId: null,
      modalName: 'postingModal'
    };
    this._toggleModal(modalValues);
  }

  _setUpOfficeModal(officeId) {
    let modalValues;
    if (officeId === '_new') {
      modalValues = {
        action: '_new',
        address: '',
        name: null,
        moreInfo: null,
        modalName: 'officeModal'
      };
    } else {
      const office = this.props.offices.find(office => office.id === officeId);
      modalValues = {
        action: '_edit',
        address: office.address,
        name: office.name,
        more_info: office.more_info,
        officeId,
        modalName: 'officeModal'
      };
    }
    this._toggleModal(modalValues);
  }

  _setUpDeletePostingModal() {
    const modalValues = {
      vacancyId: '_all',
      modalName: 'deletePostingModal'
    };
    this._toggleModal(modalValues);
  }

  _renderFilterOfficeRows() {
    const { offices, selectedOffices } = this.props;
    return offices.map(office => {
      const className = selectedOffices.includes(office.id) ? 'panel-block selected' : 'panel-block';
      return (
        <a key={office.id} className={className} onClick={() => this._handleFilterOffice(office.id)}>
          <span className='panel-icon'>
            <i className='fa fa-map-marker' />
          </span>
          { office.name }
        </a>
      );
    });
  }

  _renderEditOfficeRows() {
    return this.props.offices.map(office => {
      return (
        <a key={office.id} className='panel-block' onClick={() => this._setUpOfficeModal(office.id)}>
          <span className='panel-icon'>
            <i className='fa fa-pencil' />
          </span>
          { office.name }
        </a>
      );
    });
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
        <div className='card-content'>

          <div className='media'>
            <div className='media-content'>
              <p className='title is-5'>USERNAME</p>
            </div>
          </div>

          <div className='content'>

            <div className='field'>
              <div className='control'>
                <button className='button search-btn' onClick={this._setUpPostingModal}>
                  <i className='fa fa-plus' /> New Posting
                </button>
              </div>
            </div>

            <hr />

            <nav className='panel'>
              <p className='panel-heading'>
                <i className='fa fa-filter' /> Filter Postings
              </p>
              { this._renderFilterOfficeRows() }
            </nav>

            <hr />

            <nav className='panel'>
              <p className='panel-heading'>
                <i className='fa fa-gear' /> My Offices
              </p>
              { this._renderEditOfficeRows() }
              <a className='panel-block' onClick={() => this._setUpOfficeModal('_new')}>
                <span className='panel-icon'>
                  <i className='fa fa-plus' />
                </span>
                Add New Office
              </a>
            </nav>

            <button onClick={this._setUpDeletePostingModal}>DELETE</button>
          </div>
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
      <div>
        <div id='control-bar' className='card control-bar'>
          { this._renderCompAfterData() }
        </div>
        <div className='modals'>
          <PostingModal toggleModal={() => this._toggleModal({ modalName: 'postingModal' })} />
          <OfficeModal toggleModal={() => this._toggleModal({ modalName: 'officeModal' })} />
          <DeletePostingModal toggleModal={() => this._toggleModal({ modalName: 'deletePostingModal' })} />
        </div>
      </div>
    );
  }
}
