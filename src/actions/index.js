export const PLAY_TURN = 'play_turn';
export const LEVEL_COMPLETED = 'level_completed';
export const LEVEL_FAILED = 'level_failed';
export const PLAY_LEVEL = 'play_level';
export const SELECT_PLAYER = 'select_player';
export const CREATE_PLAYER = 'create_player';

export function playTurn(player) {
  return {
    type: PLAY_TURN
  };
}

export function levelCompleted(player) {
  return {
    type: LEVEL_COMPLETED
  };
}

export function levelFailed(player) {
  return {
    type: LEVEL_FAILED
  };
}

export function playLevel(level) {
  return {
    type: PLAY_LEVEL,
    payload: level
  };
}

export function selectPlayer(player) {
  return {
    type: SELECT_PLAYER,
    payload: player
  };
}

export function createPlayer(player) {
  return {
    type: CREATE_PLAYER,
    payload: player
  };
}
