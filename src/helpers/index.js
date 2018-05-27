export function initializeArray() {
  const fields = [];

  for (let i = 0; i < 10; i++) {
    fields.push([]);
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      fields[i].push({
        x: i,
        y: j,
        disabled: false,
        level: false,
        played: false,
        next: false
      });
    }
  }

  return fields;
}

export const findLevelFields = (fields, field) => {
  const available = findAvailableFields(fields, field);
  const result = [];

  for (let i = 0; i < available.length; i++) {
    const { level } = available[i];

    if (!level) result.push(available[i]);
  }

  return result;
};

export const findNextFields = (fields, field) => {
  const available = findAvailableFields(fields, field);
  const result = [];

  for (let i = 0; i < available.length; i++) {
    const { level, played } = available[i];

    if (level && !played) result.push(available[i]);
  }

  return result;
};

const findAvailableFields = (fields, field) => {
  const { x, y } = field;
  const result = [];

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (x - 3 == i && y == j) {
        result.push(fields[i][j]);
      }
      if (x + 3 == i && y == j) {
        result.push(fields[i][j]);
      }
      if (y - 3 == j && x == i) {
        result.push(fields[i][j]);
      }
      if (y + 3 == j && x == i) {
        result.push(fields[i][j]);
      }
      if (x - 2 == i && y - 2 == j) {
        result.push(fields[i][j]);
      }
      if (x - 2 == i && y + 2 == j) {
        result.push(fields[i][j]);
      }
      if (x + 2 == i && y - 2 == j) {
        result.push(fields[i][j]);
      }
      if (x + 2 == i && y + 2 == j) {
        result.push(fields[i][j]);
      }
    }
  }

  return result;
};

export function saveState(state) {
  try {
    const stringifyState = JSON.stringify(state);
    localStorage.setItem('state', stringifyState);
  } catch (error) {}
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
