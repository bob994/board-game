import { combineReducers } from 'redux';
import GameReducer from './reducer_game';

export default combineReducers({
  game: GameReducer,
});
