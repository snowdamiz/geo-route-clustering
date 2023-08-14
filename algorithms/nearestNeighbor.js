import { distance } from '../helpers/geometry.js'

export function nearestNeighborRoute(startCoord, coordinates) {
  const route = [startCoord]
  let remainingCoords = coordinates.filter(coord => coord[0] !== startCoord[0] || coord[1] !== startCoord[1])

  while (remainingCoords.length > 0) {
    const lastCoord = route[route.length - 1]
    const nearestCoord = findNearest(lastCoord, remainingCoords)
    route.push(nearestCoord)
    remainingCoords = remainingCoords.filter(coord => coord[0] !== nearestCoord[0] || coord[1] !== nearestCoord[1])
  }

  return route
}

function findNearest(coord, remainingCoords) {
  let nearest = remainingCoords[0]
  let minDist = distance(coord, nearest)

  for (let i = 1; i < remainingCoords.length; i++) {
    const currentDist = distance(coord, remainingCoords[i])

    if (currentDist < minDist) {
      minDist = currentDist
      nearest = remainingCoords[i]
    }
  }

  return nearest
}