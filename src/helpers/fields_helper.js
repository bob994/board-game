const findAvailableFields = (fields, field) => {
  const { x, y } = field;
  let result = [];

  fields.forEach((row) => {
    const af = row.filter(filteredField =>
      (filteredField.x === x - 3 && filteredField.y === y) ||
      (filteredField.x === x + 3 && filteredField.y === y) ||
      (filteredField.x === x && filteredField.y === y - 3) ||
      (filteredField.x === x && filteredField.y === y + 3) ||
      (filteredField.x === x - 2 && filteredField.y === y - 2) ||
      (filteredField.x === x - 2 && filteredField.y === y + 2) ||
      (filteredField.x === x + 2 && filteredField.y === y - 2) ||
      (filteredField.x === x + 2 && filteredField.y === y + 2));

    result = [...result, ...af];
  });

  return result;
};

const findLevelFields = (fields, field) => {
  const availableFields = findAvailableFields(fields, field);
  const levelFields = availableFields.filter(filteredField => !filteredField.level
    && !filteredField.played);

  return levelFields;
};

export const initializeArray = () => {
  const fields = [];

  for (let i = 0; i < 10; i += 1) {
    fields.push([]);
  }

  fields.forEach((row, i) => {
    for (let j = 0; j < 10; j += 1) {
      row.push({
        x: i,
        y: j,
        disabled: false,
        level: false,
        played: false,
        next: false,
      });
    }
  });

  return fields;
};

export const generateLevel = (fields, field, count) => {
  const currentField = field;
  const { x, y } = field;
  const availableFields = findLevelFields(fields, fields[x][y]);
  let result = [];

  while (result.length !== count) {
    if (availableFields.length === 0) {
      currentField.level = false;
      return [];
    }

    result = [];

    const randomIndex = Math.floor(Math.random() * availableFields.length);
    const nextField = availableFields[randomIndex];
    nextField.level = true;

    availableFields.splice(randomIndex, 1);
    result = [nextField, ...generateLevel(fields, nextField, count - 1)];
  }

  return result;
};

export const findNextFields = (fields, field) => {
  const availableFields = findAvailableFields(fields, field);
  const nextFields = availableFields.filter(filteredField => filteredField.level
    && !filteredField.played);

  nextFields.forEach((nextField) => {
    const next = nextField;
    next.next = true;
  });

  return nextFields;
};

export const disableFields = (fields) => {
  fields.forEach((row) => {
    row.forEach((cell) => {
      const currentCell = cell;
      if (!currentCell.level) currentCell.disabled = true;
    });
  });
};
