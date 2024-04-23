import { processLine, ReportData } from '../process-line'
import { parseHttpLog } from '../parse-http-log'

describe('processLine function', () => {
  it('should update URL and IP counts correctly for a valid log line', () => {
    const line = '72.44.32.10 - - [09/Jul/2018:15:48:07 +0200] "GET / HTTP/1.1" 200 3574'
    const urlCounts = new Map<string, number>()
    const ipCounts = new Map<string, number>()

    const parsedLog = parseHttpLog(line)
    const reportData: ReportData = processLine(line, urlCounts, ipCounts)

    expect(parsedLog).toBeTruthy()
    expect(reportData).toBeTruthy()
    expect(reportData.urlCounts.size).toBe(1)
    expect(reportData.urlCounts.get('/')).toBe(1)
    expect(reportData.ipCounts.size).toBe(1)
    expect(reportData.ipCounts.get('72.44.32.10')).toBe(1)
  })

  it('should not update counts for invalid log line', () => {
    const line = 'Invalid log line'
    const urlCounts = new Map<string, number>()
    const ipCounts = new Map<string, number>()

    const parsedLog = parseHttpLog(line)
    const reportData: ReportData = processLine(line, urlCounts, ipCounts)

    expect(parsedLog).toBeNull()
    expect(reportData).toBeTruthy()
    expect(reportData.urlCounts.size).toBe(0)
    expect(reportData.ipCounts.size).toBe(0)
  })
})
