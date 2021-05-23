import * as router from 'react-router-dom';
import { ReactQueryClient } from 'config/react-query.js';

import { List } from './list.js';
import { Details } from './details.js';

export const App = () => (
  <ReactQueryClient>
    <router.Route path={'/:id'} component={Details} />
    <router.Route path={'/'} component={List} exact />
  </ReactQueryClient>
);

export const AppWithBrowserRouter = () => (
  <router.BrowserRouter basename={'/'}>
    <App />
  </router.BrowserRouter>
);
