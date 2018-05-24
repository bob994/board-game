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
        current: false,
        next: false
      });
    }
  }

  return fields;
}
