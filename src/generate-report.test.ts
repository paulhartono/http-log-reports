import { generateReport } from './generate-report'

describe('generateReport function', () => {
  it('should generate report with correct data', () => {
    const urlCounts = new Map<string, number>([
      ['/page1', 10],
      ['/page2', 5],
      ['/page3', 15],
      ['/page4', 3],
    ])

    const ipCounts = new Map<string, number>([
      ['192.168.1.1', 20],
      ['127.0.0.1', 8],
      ['10.0.0.1', 12],
      ['172.16.0.1', 5],
    ])

    const reportData = generateReport(urlCounts, ipCounts)

    expect(reportData.uniqueIPs).toBe(4)
    expect(reportData.topVisitedURLs).toEqual(['/page3', '/page1', '/page2'])
    expect(reportData.topActiveIPs).toEqual(['192.168.1.1', '10.0.0.1', '127.0.0.1'])
  })

  it('should handle empty URL and IP counts', () => {
    const urlCounts = new Map<string, number>()
    const ipCounts = new Map<string, number>()

    const reportData = generateReport(urlCounts, ipCounts)

    expect(reportData.uniqueIPs).toBe(0)
    expect(reportData.topVisitedURLs).toEqual([])
    expect(reportData.topActiveIPs).toEqual([])
  })
})
