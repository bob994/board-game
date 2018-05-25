export const GENERATE_LEVEL = 'generate_level';
export const PLAY_TURN = 'play_turn';
export const LEVEL_COMPLETED = 'level_completed';
export const LEVEL_FAILED = 'level_failed';

export function generateLevel(fields) {
  return {
    type: GENERATE_LEVEL,
    payload: fields
  };
}

export function playTurn(fields) {
  return {
    type: PLAY_TURN,
    payload: fields
  };
}

export function levelCompleted() {
  return {
    type: LEVEL_COMPLETED
  };
}

export function levelFailed() {
  return {
    type: LEVEL_FAILED
  };
}
