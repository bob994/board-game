import { findLevelFields } from '../helpers/fields_helper';

self.onmessage = msg => {
  console.log(new Date().getMinutes().toString() + "_" + new Date().getSeconds().toString(), 'start')
  const arr = generateLevel(msg.data.fields, msg.data.field, msg.data.level);
  console.log(new Date().getMinutes().toString() + "_" + new Date().getSeconds().toString(), 'end')
  self.postMessage({ level: arr, fields: msg.data.fields });
};

const generateLevel = (fields, field, count) => {
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
