import {
  GENERATE_LEVEL,
  PLAY_TURN,
  LEVEL_COMPLETED,
  LEVEL_FAILED,
  PLAY_LEVEL
} from '../actions';
import { initializeArray } from '../helpers';

const initState = {
  levelGenerated: false,
  lives: 1,
  lastLevel: 1,
  level: 1,
  fieldsLeftToClick: 1,
  fields: initializeArray()
};

export default function(state = initState, action) {
  switch (action.type) {
    case GENERATE_LEVEL:
      return {
        ...state,
        levelGenerated: true,
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
        lastLevel:
          state.lastLevel > state.level ? state.lastLevel : state.level,
        level: ++state.level,
        levelGenerated: false,
        fieldsLeftToClick: state.level + 1,
        fields: initializeArray()
      };
    case LEVEL_FAILED:
      return {
        ...state,
        lives: state.lives - state.fieldsLeftToClick,
        lastLevel:
          state.lives - state.fieldsLeftToClick > 0 ? state.lastLevel : 1,
        fieldsLeftToClick: 1,
        fields: initializeArray()
      };
    case PLAY_LEVEL:
      return {
        ...state,
        levelGenerated: false,
        level: action.payload,
        fieldsLeftToClick: action.payload + 1,
        fields: initializeArray()
      };
    default:
      return state;
  }
}
