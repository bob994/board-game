export function saveState(state) {
  try {
    const stringifyState = JSON.stringify(state);
    localStorage.setItem('state', stringifyState);
  } catch (error) {
    console.error(error);
  }
}

export function loadState() {
  try {
    const state = localStorage.getItem('state');
    if (state === null) return undefined;
    return JSON.parse(state);
  } catch (error) {
    return undefined;
  }
}
