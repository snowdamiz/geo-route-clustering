// Split an array into chunks of a given size
export function chunkArray(array, chunkSize) {
  const chunks = []

  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }

  return chunks
}

// Swap two elements in an array
export function swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]]
}

// Get a random integer
export function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}