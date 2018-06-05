import {
  PLAY_TURN,
  LEVEL_COMPLETED,
  LEVEL_FAILED,
  PLAY_LEVEL,
  CREATE_PLAYER,
  SELECT_PLAYER,
} from '../actions';

import config from '../config/config';

const initState = {
  selectedPlayer: 'Guest',
  players: {
    Guest: {
      lives: 1,
      lastLevel: config.StartingLevel - 1,
      level: config.StartingLevel,
      fieldsLeftToClick: 2,
      topScore: [],
    },
  },
};

export default function (state = initState, action) {
  const { selectedPlayer, players } = state;
  const { fieldsLeftToClick, lastLevel, topScore } = players[selectedPlayer];
  const {
    lives, level,
  } = players[
    selectedPlayer
  ];

  switch (action.type) {
    case PLAY_TURN:
      return {
        ...state,
        players: {
          ...players,
          [selectedPlayer]: {
            ...players[selectedPlayer],
            fieldsLeftToClick: players[selectedPlayer].fieldsLeftToClick - 1,
          },
        },
      };
    case LEVEL_COMPLETED: {
      if (topScore[level - 1] === undefined) topScore[level - 1] = [];

      const arr = topScore[level - 1];
      arr.push(action.payload);

      return {
        ...state,
        players: {
          ...players,
          [selectedPlayer]: {
            lives: lives + 1,
            lastLevel: lastLevel > level ? lastLevel : level,
            level: level + 1,
            fieldsLeftToClick: level + 2,
            topScore: [...topScore],
          },
        },
      };
    }
    case LEVEL_FAILED:
      return {
        ...state,
        players: {
          ...players,
          [selectedPlayer]: {
            lives:
              lives - fieldsLeftToClick > 0 ? lives - fieldsLeftToClick : 1,
            lastLevel:
              lives - fieldsLeftToClick > 0
                ? lastLevel
                : config.StartingLevel - 1,
            fieldsLeftToClick: 1,
            topScore,
            level: config.StartingLevel,
          },
        },
      };
    case PLAY_LEVEL:
      return {
        ...state,
        players: {
          ...players,
          [selectedPlayer]: {
            ...players[selectedPlayer],
            lives: players[selectedPlayer].lives,
            levelGenerated: false,
            level: action.payload,
            fieldsLeftToClick: action.payload + 1,
          },
        },
      };
    case SELECT_PLAYER:
      return {
        ...state,
        selectedPlayer: action.payload,
      };
    case CREATE_PLAYER:
      return {
        ...state,
        selectedPlayer: action.payload,
        players: {
          ...players,
          [action.payload]: {
            lives: 1,
            lastLevel: config.StartingLevel - 1,
            level: config.StartingLevel,
            fieldsLeftToClick: 1,
            topScore: [],
          },
        },
      };
    default:
      return state;
  }
}
