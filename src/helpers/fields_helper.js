export const initializeArray = () => {
  const fields = [];

  for (let i = 0; i < 10; i++) {
    fields.push([]);
  }

  fields.forEach((row, i) => {
    for (let j = 0; j < 10; j++) {
      row.push({
        x: i,
        y: j,
        disabled: false,
        level: false,
        played: false,
        next: false
      });
    }
  });

  return fields;
};

export const generateLevel = (fields, field, count) => {
  const { x, y } = field;
  const availableFields = findLevelFields(fields, fields[x][y]);
  let result = [];

  while (result.length !== count) {
    if (availableFields.length === 0) {
      field.level = false;
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
  const nextFields = availableFields.filter(
    field => field.level && !field.played
  );

  nextFields.forEach(field => {
    field.next = true;
  });

  return nextFields;
};

const findLevelFields = (fields, field) => {
  const availableFields = findAvailableFields(fields, field);
  const levelFields = availableFields.filter(
    field => !field.level && !field.played
  );

  return levelFields;
};

const findAvailableFields = (fields, field) => {
  const { x, y } = field;
  let result = [];

  fields.forEach(row => {
    const af = row.filter(
      field =>
        (field.x == x - 3 && field.y == y) ||
        (field.x == x + 3 && field.y == y) ||
        (field.x == x && field.y == y - 3) ||
        (field.x == x && field.y == y + 3) ||
        (field.x == x - 2 && field.y == y - 2) ||
        (field.x == x - 2 && field.y == y + 2) ||
        (field.x == x + 2 && field.y == y - 2) ||
        (field.x == x + 2 && field.y == y + 2)
    );

    result = [...result, ...af];
  });

  return result;
};

export const disableFields = fields => {
  fields.forEach(row => {
    row.forEach(cell => {
      if (!cell.level) cell.disabled = true;
    });
  });
};
