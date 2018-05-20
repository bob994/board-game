import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LevelPicker from './containers/LevelPicker';
import Game from './containers/Game';
import TopScore from './containers/TopScore';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/game" component={Game} />
        <Route path="/topscore" component={TopScore} />
        <Route path="/" component={LevelPicker} />
      </Switch>
    </div>
  </BrowserRouter>,
  document.querySelector('.container')
);
