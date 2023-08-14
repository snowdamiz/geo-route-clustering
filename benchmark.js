// Benchmark
export function benchmarkedRun(func, label, timeLabel, ...args) {
  const { time, timeEnd, log } = console

  time(timeLabel)
  const result = func(...args)
  timeEnd(timeLabel)
  log(label, result)
  return result
}
  