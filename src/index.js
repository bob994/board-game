import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { saveState, loadState } from './helpers';

import reducers from './reducers';

import LevelPicker from './containers/LevelPicker';
import Game from './containers/Game';
import TopScore from './containers/TopScore';

const localState = loadState();

const store = createStore(reducers, localState);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/game" component={Game} />
          <Route path="/topscore" component={TopScore} />
          <Route path="/" component={LevelPicker} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('.container')
);
