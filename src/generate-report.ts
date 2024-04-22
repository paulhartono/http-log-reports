export function generateReport(urlCounts: Map<string, number>, ipCounts: Map<string, number>) {
  const uniqueIPs = ipCounts.size

  const topVisitedURLs = [...urlCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([url]) => url)

  const topActiveIPs = [...ipCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([ip]) => ip)

  return {
    uniqueIPs,
    topVisitedURLs,
    topActiveIPs,
  }
}
