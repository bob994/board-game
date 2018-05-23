import { GENERATE_LEVEL } from '../actions';
import { initializeArray } from '../helpers';

const initState = {
  lives: 1,
  level: 26,
  fieldsLeftToClick: 1,
  fields: initializeArray()
};

export default function(state = initState, action) {
  switch (action.type) {
    case GENERATE_LEVEL:
      return {
        lives: state.lives,
        level: state.level,
        fieldsLeftToClick: state.level,
        fields: action.payload
      };
    default:
      return state;
  }
}
