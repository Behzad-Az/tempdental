import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { empGetApplList } from 'actions/EmployerPage/Applicants';
import ApplicantRow from 'components/EmployerPage/ApplicantRow.jsx';

@connect(state => ({
  modals: state.empControlBar.get('modals'),
  modalValues: state.empControlBar.get('modalValues'),
  applicants: state.empApplicants.get('applicants'),
  pageError: state.empApplicants.get('pageError'),
  dataLoaded: state.empApplicants.get('dataLoaded')
}))

export default class ApplicantListModal extends Component {
  static propTypes = {
    modals: PropTypes.object,
    modalValues: PropTypes.object,
    applicants: PropTypes.array,
    pageError: PropTypes.bool,
    dataLoaded: PropTypes.bool,
    toggleModal: PropTypes.func,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._renderCompAfterData = this._renderCompAfterData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { modalValues, dispatch } = this.props;
    if (nextProps.modals.applicantListModal && nextProps.modalValues.vacancyId !== modalValues.vacancyId) {
      dispatch(empGetApplList(nextProps.modalValues.vacancyId));
    }
  }

  _renderCompAfterData() {
    const { dataLoaded, pageError, applicants } = this.props;
    if (dataLoaded && pageError) {
      return (
        <p className='page-msg'>
          <i className='fa fa-exclamation-triangle' aria-hidden='true' />
          Error in loading up the page
        </p>
      );
    } else if (dataLoaded) {
      return (
        <div className='applicants-container'>
          { applicants.map(applicant => <ApplicantRow key={applicant.id} applicant={applicant} /> ) }
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
    const { toggleModal, modals, applicants, modalValues } = this.props;
    return (
      <div className={modals.applicantListModal ? 'modal is-active' : 'modal'}>
        <div className='modal-background' onClick={toggleModal} />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>
              Applicants for {modalValues.title}
              <br />
              @ {modalValues.officeName}
            </p>
            <button className='delete' aria-label='close' onClick={toggleModal} />
          </header>
          <section className='modal-card-body'>
            { this._renderCompAfterData() }
          </section>
          <footer className='modal-card-foot'>
            <button className='button is-success' onClick={null}>Yo Yo</button>
            <button className='button' onClick={toggleModal}>Never mind</button>
          </footer>
        </div>
      </div>
    );
  }
}