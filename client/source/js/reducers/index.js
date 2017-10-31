import { combineReducers } from 'redux';
import applControlBar from 'reducers/ApplicantPage/ControlBar';
import applVacancies from 'reducers/ApplicantPage/Vacancies';
import empControlBar from 'reducers/EmployerPage/ControlBar';
import empPostings from 'reducers/EmployerPage/Postings';
import empApplications from 'reducers/EmployerPage/Applications';
import navbar from 'reducers/Global/Navbar';

export default combineReducers({
  applControlBar,
  applVacancies,
  empControlBar,
  empPostings,
  empApplications,
  navbar
});
