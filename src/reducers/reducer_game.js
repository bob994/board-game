import {
  GENERATE_LEVEL,
  PLAY_TURN,
  LEVEL_COMPLETED,
  LEVEL_FAILED
} from '../actions';
import { initializeArray } from '../helpers';

const initState = {
  lives: 8,
  level: 8,
  fieldsLeftToClick: 1,
  fields: initializeArray()
};

export default function(state = initState, action) {
  switch (action.type) {
    case GENERATE_LEVEL:
      return {
        ...state,
        fieldsLeftToClick: state.level,
        fields: action.payload
      };
    case PLAY_TURN:
      return {
        ...state,
        fieldsLeftToClick: --state.fieldsLeftToClick,
        fields: action.payload
      };
    case LEVEL_COMPLETED:
      return {
        lives: ++state.lives,
        level: ++state.level,
        fieldsLeftToClick: 1,
        fields: initializeArray()
      };
    case LEVEL_FAILED:
      return {
        ...state,
        lives: state.lives - state.fieldsLeftToClick,
        fieldsLeftToClick: 1,
        fields: initializeArray()
      };
    default:
      return state;
  }
}
