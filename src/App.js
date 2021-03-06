import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router.js';
import MyLayout from './layout';

export default () => {
  return (
    <BrowserRouter>
        <MyLayout>
          <Router />
        </MyLayout>
      </BrowserRouter>
  );
};
