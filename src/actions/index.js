export const GENERATE_LEVEL = 'generate_level';

export function generateLevel(fields) {
  return {
    type: GENERATE_LEVEL,
    payload: fields
  };
}
