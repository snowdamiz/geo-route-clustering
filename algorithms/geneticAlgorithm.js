import { chunkArray, getRandomInt } from '../helpers/arrayManipulation.js'
import { getFurthestPair, routeDistance } from '../helpers/geometry.js'
import { nearestNeighborRoute } from '../algorithms/nearestNeighbor.js'
import { mutate, PMXCrossover, applyMutation } from '../helpers/mutations.js'

// Genetic algorithm implementation for the TSP
export function geneticAlgorithm(coordinates) {
  const generations = 1000
  const populationSize = 100
  const mutationRate = 0.01
  const elitismSize = Math.round(0.15 * populationSize)

  const routes = []
  const coordinateChunks = chunkArray(coordinates, coordinates.length)

  let bestFitnessSoFar = Infinity
  let generationsWithoutImprovement = 0
  const maxGenerationsWithoutImprovement = 200

  for (const coords of coordinateChunks) {
    const edges = getFurthestPair(coords)
    const nearestNeighborGeneratedRoute = nearestNeighborRoute(edges[getRandomInt(2)], coords)

    let population = [nearestNeighborGeneratedRoute]

    for (let i = 1; i < populationSize; i++) {
      const routeVariant = [...nearestNeighborGeneratedRoute]
      mutate(routeVariant)
      population.push(routeVariant)
    }

    for (let i = 0; i < generations; i++) {
      const newPopulation = []
      let sortedPopulation = [...population].sort((a, b) => routeDistance(a) - routeDistance(b))

      for (let j = 0; j < elitismSize; j++) {
        newPopulation.push(sortedPopulation[j])
      }

      for (let j = elitismSize; j < populationSize; j++) {
        const parent1 = selectParent(population)
        const parent2 = selectParent(population)
        let child = PMXCrossover(parent1, parent2)

        if (Math.random() < mutationRate) {
          child = applyMutation(child)
        }

        newPopulation.push(child)
      }

      population = newPopulation

      const bestCurrentDistance = routeDistance(population[0])

      if (bestCurrentDistance < bestFitnessSoFar) {
        bestFitnessSoFar = bestCurrentDistance
        generationsWithoutImprovement = 0
      } else {
        generationsWithoutImprovement++
      }

      if (generationsWithoutImprovement >= maxGenerationsWithoutImprovement) {
        console.log("Convergence reached at generation " + i + ". Stopping the GA for this cluster.")
        break
      }
    }

    routes.push(population[0])
  }

  return routes
}

function selectParent(population) {
  const tournamentSize = 10
  let bestRoute = null
  let bestDistance = Infinity

  for (let i = 0; i < tournamentSize; i++) {
    const route = population[getRandomInt(population.length)]
    const currentDistance = routeDistance(route)

    if (currentDistance < bestDistance) {
      bestDistance = currentDistance
      bestRoute = route
    }
  }

  return bestRoute
}