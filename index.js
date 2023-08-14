import { benchmarkedRun } from "./benchmark.js"
import { coordinates } from "./data/coords.js"
import { optimizedRadialClusteredRoutes } from "./execution/RKM.js"

function main() {
  benchmarkedRun(optimizedRadialClusteredRoutes, "RKM", "RKM Execution Time", coordinates, 14)
}

main()
