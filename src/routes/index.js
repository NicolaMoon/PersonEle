import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Sign } from '../pages';

export default () => (
  <Switch>
      <Route path="/" component={Sign} />
  </Switch>
);
