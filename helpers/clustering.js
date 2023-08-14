import { calculateCentroid, computeRadialDistance } from './geometry.js'
import { chunkArray } from './arrayManipulation.js'

// RKM clustering
export function radialKMeansClustering(coords, numClusters) {
  const centroid = calculateCentroid(coords)

  const coordsWithRadialDist = coords.map(coord => ({
    coord,
    radialDistance: computeRadialDistance(centroid, coord)
  }))

  const sortedCoordsWithRadialDist = coordsWithRadialDist.sort((a, b) => a.radialDistance - b.radialDistance)
  const sortedCoords = sortedCoordsWithRadialDist.map(item => item.coord)
  
  const clusterSize = Math.ceil(coords.length / numClusters)
  const clusters = chunkArray(sortedCoords, clusterSize)

  return clusters
}