import { radialKMeansClustering } from '../helpers/clustering.js'
import { geneticAlgorithm } from '../algorithms/geneticAlgorithm.js'

// RKM main execution call
export function optimizedRadialClusteredRoutes(coordinates, numberOfRoutes) {
  const clusters = radialKMeansClustering(coordinates, numberOfRoutes)
  const optimizedRoutes = []

  for (const cluster of clusters) {
    const optimizedRoute = geneticAlgorithm(cluster, 1)[0]
    optimizedRoutes.push(optimizedRoute)
  }

  return optimizedRoutes
}