import { parseHttpLog } from './parse-http-log'

export interface ReportData {
  urlCounts: Map<string, number>
  ipCounts: Map<string, number>
}

// Function to process a line of string (log)
export function processLine(line: string, urlCounts: Map<string, number>, ipCounts: Map<string, number>): ReportData {
  // 1. We parse the line string as http log
  const parsedLog = parseHttpLog(line)

  if (parsedLog) {
    // 2. Update URL visit counts
    const url = parsedLog.url
    urlCounts.set(url.path, (urlCounts.get(url.path) || 0) + 1)

    // 3. Update IP activity counts
    const ip = parsedLog.ip
    ipCounts.set(ip, (ipCounts.get(ip) || 0) + 1)

    /*
      The first requirement to find unique IP address, does not need to be handled separately.
      If there was no requirement to get active IP address, we might want to take different approach
    */
  }

  return {
    urlCounts,
    ipCounts,
  }
}
