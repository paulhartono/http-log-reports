import { parseHttpLog } from './parse-http-log'

export interface ReportData {
  urlCounts: Map<string, number>
  ipCounts: Map<string, number>
}

export function processLine(line: string, urlCounts: Map<string, number>, ipCounts: Map<string, number>): ReportData {
  const parsedLog = parseHttpLog(line)
  if (parsedLog) {
    // Update URL visit counts
    const url = parsedLog.url
    urlCounts.set(url.path, (urlCounts.get(url.path) || 0) + 1)

    // Update IP activity counts
    const ip = parsedLog.ip
    ipCounts.set(ip, (ipCounts.get(ip) || 0) + 1)
  }

  return {
    urlCounts,
    ipCounts,
  }
}
