// Get the distance between two points
export function distance(point1, point2) {
  const [x1, y1] = point1
  const [x2, y2] = point2
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

// Get most center coordinate
export function calculateCentroid(coords) {
  const sum = coords.reduce((acc, [x, y]) => [acc[0] + x, acc[1] + y], [0, 0])
  return [sum[0] / coords.length, sum[1] / coords.length]
}

// Get the radial distance
export function computeRadialDistance(centroid, [x, y]) {
  const [cx, cy] = centroid
  return Math.atan2(y - cy, x - cx)
}

// Get the furthest pair of coordinates
export function getFurthestPair(coordinates) {
  let maxDist = 0
  let pair = [coordinates[0], coordinates[1]]

  for (let i = 0; i < coordinates.length; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      const dist = distance(coordinates[i], coordinates[j])

      if (dist > maxDist) {
        maxDist = dist
        pair = [coordinates[i], coordinates[j]]
      }
    }
  }

  return pair
}

export function routeDistance(route) {
  let total = 0

  for (let i = 1; i < route.length; i++) {
    total += distance(route[i - 1], route[i])
  }

  return total
}