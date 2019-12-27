// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import type { Store } from '../../reducers/types';
import { theme, MosaicBaseStyle } from '@nectar-cs/js-common';
import { ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router';
import ActivityChoices from '../ActivityChoices/ActivityChoices';
import Welcome from './Welcome';
import Install from '../Install/Install';
import Configuration from '../Configuration/Configuration';

function Root({ store, history }: Props) {
  return(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MosaicBaseStyle />
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/activities' exact component={ActivityChoices}/>
            <Route path='/install' exact component={Install}/>
            <Route path='/configure/:seq' component={Configuration}/>
            <Route path='/' component={Welcome}/>
          </Switch>
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default hot(Root);

type Props = {
  store: Store,
  history: {}
};
