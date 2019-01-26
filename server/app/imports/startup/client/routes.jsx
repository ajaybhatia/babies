import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

/**
 * The React Router client side routing definitions.
 * @namespace Client.Routes
 * @desc This is the main definition for the react router.
 */

import * as Component from './templates.jsx';

const Routes = () => (
  <Router history={ browserHistory }>
    
      <Route path="/" component={Component.MasterLayout}>
  <IndexRoute component={Component.Home}/>
</Route>
      <Route path="*" component={ Component.MasterLayout }>
      <IndexRoute component={ Component.NotFound }/>
    </Route>
  </Router>
);

export default Routes;
