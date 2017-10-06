import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from 'views/NotFound';
import ApplicantPage from 'views/ApplicantPage';
import EmployerPage from 'views/EmployerPage';

const publicPath = '/';

export const routeCodes = {
  APPLICANT: `${ publicPath }applicant`,
  EMPLOYER: `${ publicPath }employer`
};

export default () => (
  <Switch>
    <Route path={ routeCodes.APPLICANT } component={ ApplicantPage } />
    <Route path={ routeCodes.EMPLOYER } component={ EmployerPage } />
    <Route path='*' component={ NotFound } />
  </Switch>
);
