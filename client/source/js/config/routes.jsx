import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from 'views/NotFound';
import ApplicantPage from 'views/ApplicantPage';
import EmployerPage from 'views/EmployerPage';
import LoginPage from 'views/LoginPage';

const publicPath = '/';

export const routeCodes = {
  APPLICANT: `${ publicPath }applicant`,
  EMPLOYER: `${ publicPath }employer`,
  LOGIN: `${ publicPath }login`
};

export default () => (
  <Switch>
    <Route path={ routeCodes.APPLICANT } component={ ApplicantPage } />
    <Route path={ routeCodes.EMPLOYER } component={ EmployerPage } />
    <Route path={ routeCodes.LOGIN } component= { LoginPage } />
    <Route path='*' component={ NotFound } />
  </Switch>
);
