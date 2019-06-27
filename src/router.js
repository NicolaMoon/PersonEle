import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Notes } from './pages';

export default () => (
  <Switch>
      <Route path="/" component={Notes} />
  </Switch>
);