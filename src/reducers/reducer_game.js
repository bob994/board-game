import {
  PLAY_TURN,
  LEVEL_COMPLETED,
  LEVEL_FAILED,
  PLAY_LEVEL,
  CREATE_PLAYER,
  SELECT_PLAYER
} from '../actions';
import { initializeArray } from '../helpers';
import { WSAETIMEDOUT } from 'constants';

const initState = {
  selectedPlayer: 'Guest',
  players: {
    Guest: {
      lives: 1,
      lastLevel: 0,
      level: 1,
      fieldsLeftToClick: 1
    }
  }
};

export default function(state = initState, action) {
  const selected = state.selectedPlayer;

  switch (action.type) {
    case PLAY_TURN:
      return {
        ...state,
        players: {
          ...state.players,
          [selected]: {
            ...state.players[selected],
            fieldsLeftToClick: --state.players[selected].fieldsLeftToClick
          }
        }
      };
    case LEVEL_COMPLETED:
      return {
        ...state,
        players: {
          ...state.players,
          [selected]: {
            lives: ++state.players[selected].lives,
            lastLevel:
              state.players[selected].lastLevel > state.players[selected].level
                ? state.players[selected].lastLevel
                : state.players[selected].level,
            level: ++state.players[selected].level,
            fieldsLeftToClick: state.players[selected].level + 1
          }
        }
      };
    case LEVEL_FAILED:
      return {
        ...state,
        players: {
          ...state.players,
          [selected]: {
            lives:
              state.players[selected].lives -
              state.players[selected].fieldsLeftToClick,
            lastLevel:
              state.players[selected].lives -
                state.players[selected].fieldsLeftToClick >
              0
                ? state.players[selected].lastLevel
                : 0,
            fieldsLeftToClick: 1
          }
        }
      };
    case PLAY_LEVEL:
      return {
        ...state,
        players: {
          ...state.players,
          [state.selectedPlayer]: {
            ...state.players[state.selectedPlayer],
            lives: state.players[state.selectedPlayer].lives,
            levelGenerated: false,
            level: action.payload,
            fieldsLeftToClick: action.payload + 1
          }
        }
      };
    case SELECT_PLAYER:
      return {
        ...state,
        selectedPlayer: action.payload
      };
    case CREATE_PLAYER:
      return {
        ...state,
        selectedPlayer: action.payload,
        players: {
          ...state.players,
          [action.payload]: {
            lives: 1,
            lastLevel: 0,
            level: 1,
            fieldsLeftToClick: 1
          }
        }
      };
    default:
      return state;
  }
}
