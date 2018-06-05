let broj = 0;

const findAvailableFields = (fields, field) => {
  const { x, y } = field;
  let result = [];

  if (x - 3 >= 0) result.push(fields[x - 3][y]);
  if (x + 3 <= 9) result.push(fields[x + 3][y]);
  if (y - 3 >= 0) result.push(fields[x][y - 3]);
  if (y + 3 <= 9) result.push(fields[x][y + 3]);
  if (x - 2 >= 0 && y - 2 >= 0) result.push(fields[x - 2][y - 2]);
  if (x - 2 >= 0 && y + 2 <= 9) result.push(fields[x - 2][y + 2]);
  if (x + 2 <= 9 && y + 2 <= 9) result.push(fields[x + 2][y + 2]);
  if (x + 2 <= 9 && y - 2 >= 0) result.push(fields[x + 2][y - 2]);

  // fields.forEach((row) => {
  //   const af = row.filter(filteredField =>
  //     (filteredField.x === x - 3 && filteredField.y === y) ||
  //     (filteredField.x === x + 3 && filteredField.y === y) ||
  //     (filteredField.x === x && filteredField.y === y - 3) ||
  //     (filteredField.x === x && filteredField.y === y + 3) ||
  //     (filteredField.x === x - 2 && filteredField.y === y - 2) ||
  //     (filteredField.x === x - 2 && filteredField.y === y + 2) ||
  //     (filteredField.x === x + 2 && filteredField.y === y - 2) ||
  //     (filteredField.x === x + 2 && filteredField.y === y + 2));

  //   result = [...result, ...af];
  // });

  return result;
};

export const findLevelFields = (fields, field) => {
  const availableFields = findAvailableFields(fields, field);
  
  if (availableFields.length === 0 || availableFields === null || availableFields === undefined) return [];

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
  console.log(broj += 1);
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
