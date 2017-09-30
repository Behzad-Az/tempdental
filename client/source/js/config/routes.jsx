import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from 'views/NotFound';
import ApplicantPage from 'views/ApplicantPage';
import EmployerPage from 'views/EmployerPage';

const publicPath = '/';

export const routeCodes = {
  APPLICANTPAGE: `${ publicPath }applicant`,
  EMPLOYERPAGE: `${ publicPath }employer`
};

export default () => (
  <Switch>
    <Route path={ routeCodes.APPLICANTPAGE } component={ ApplicantPage } />
    <Route path={ routeCodes.EMPLOYERPAGE } component={ EmployerPage } />
    <Route path='*' component={ NotFound } />
  </Switch>
);
