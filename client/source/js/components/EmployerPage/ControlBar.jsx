import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  empGetControlData,
  addRemoveSelectedOffice,
  empToggleModal
} from 'actions/EmployerPage/ControlBar';
import OfficeModal from './OfficeModal.jsx';

@connect(state => ({
  dataLoaded: state.empControlBar.get('dataLoaded'),
  pageError: state.empControlBar.get('pageError'),
  offices: state.empControlBar.get('offices'),
  selectedOffices: state.empControlBar.get('selectedOffices')
}))

export default class ControlBar extends Component {
  static propTypes = {
    dataLoaded: PropTypes.bool,
    pageError: PropTypes.bool,
    offices: PropTypes.array,
    selectedOffices: PropTypes.array,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._handleFilterOffice = this._handleFilterOffice.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
    this._renderFilterOfficeRows = this._renderFilterOfficeRows.bind(this);
    this._renderEditOfficeRows = this._renderEditOfficeRows.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(empGetControlData());
  }

  _handleFilterOffice(officeId) {
    this.props.dispatch(addRemoveSelectedOffice(officeId));
  }

  _toggleModal(args) {
    this.props.dispatch(empToggleModal(args));
  }

  _renderFilterOfficeRows() {
    return this.props.offices.map(office => {
      const className = this.props.selectedOffices.includes(office.id) ? 'panel-block selected' : 'panel-block';
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
        <a key={office.id} className='panel-block' onClick={() => this._toggleModal({ modalName: 'showOfficeModal', editedOfficeId: office.id })}>
          <span className='panel-icon'>
            <i className='fa fa-pencil' />
          </span>
          { office.name }
        </a>
      );
    });
  }

  _renderCompAfterData() {
    if (this.props.dataLoaded && this.props.pageError) {
      return (
        <p className='page-msg'>
          <i className='fa fa-exclamation-triangle' aria-hidden='true' />
          Error in loading up the page
        </p>
      );
    } else if (this.props.dataLoaded) {
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
                <button className='button search-btn'><i className='fa fa-plus' /> New Posting</button>
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
              <OfficeModal toggleModal={() => this._toggleModal({ modalName: 'showOfficeModal', editedOfficeId: null })} />
              { this._renderEditOfficeRows() }
              <a className='panel-block' onClick={() => this._toggleModal({ modalName: 'showOfficeModal', editedOfficeId: '_new' })}>
                <span className='panel-icon'>
                  <i className='fa fa-plus' />
                </span>
                Add New Office
              </a>
            </nav>

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
      <div id='control-bar' className='card control-bar'>
        { this._renderCompAfterData() }
      </div>
    );
  }
}
