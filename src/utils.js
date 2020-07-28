export function findNestedIndices(array, id) {
  let i;
  let j;

  for (i = 0; i < array.length; ++i) {
    const nestedArray = array[i];
    for (j = 0; j < nestedArray.length; ++j) {
      const object = nestedArray[j];
      if (object.id === id) {
        return { i, j };
      }
    }
  }
  return {};
}
