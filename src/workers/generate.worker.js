/* eslint no-restricted-globals: 1 */
import { findLevelFields } from '../helpers/fields_helper';

const generateLevel = (fields, field, count) => {
  let result = [];

  if (count > 90) { // Quick fix // Todo - write better algorithm
    fields.forEach((row) => {
      row.forEach((cell) => {
        const currentCell = cell;
        currentCell.level = true;

        if (!currentCell.played) result.push(currentCell);
      });
    });

    for (let index = 0; index < 99 - count; index += 1) {
      const randomIndex = Math.floor(Math.random() * 100);

      if (result[randomIndex] === undefined || !result[randomIndex].level) index -= 1;
      else {
        result[randomIndex].level = false;
        result.splice(randomIndex, 1);
      }
    }

    return result;
  }

  const { x, y } = field;
  const currentField = field;
  const availableFields = findLevelFields(fields, fields[x][y]);

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

self.onmessage = (msg) => {
  const arr = generateLevel(msg.data.fields, msg.data.field, msg.data.level);
  self.postMessage({ level: arr, fields: msg.data.fields });
};
