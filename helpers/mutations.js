import { getRandomInt, swap } from "./arrayManipulation.js"

// Apply Mutation
export function applyMutation(route) {
  const TWO_OPT_PROBABILITY = 0.5
  return Math.random() < TWO_OPT_PROBABILITY ? twoOpt(route) : mutate(route)
}

// 2-opt Mutation
export function twoOpt(route) {
  let index1 = getRandomInt(route.length)
  let index2 = getRandomInt(route.length)

  while (index2 === index1) {
    index2 = getRandomInt(route.length)
  }

  const [i, j] = [index1, index2].sort((a, b) => a - b)
  return route.slice(0, i).concat(route.slice(i, j + 1).reverse()).concat(route.slice(j + 1))
}

// Mutate
export function mutate(route) {
  swap(route, getRandomInt(route.length), getRandomInt(route.length))
  return route
}

// PMX Crossover (Partially Mapped Crossover)
export function PMXCrossover(parent1, parent2) {
  let child = Array(parent1.length).fill(null)

  const start = getRandomInt(parent1.length)
  const end = (getRandomInt(parent1.length) + start) % parent1.length

  let mapping = {}

  for (let i = start; i < end; i++) {
    child[i] = parent1[i]
    mapping[parent1[i]] = parent2[i]
  }

  for (let i = 0; i < parent1.length; i++) {
    if (child[i] === null) {
      let insert = parent2[i]

      while (Object.keys(mapping).includes(insert.join(','))) {
        insert = mapping[insert]
      }

      child[i] = insert
    }
  }

  return child
}