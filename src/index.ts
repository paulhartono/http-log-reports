import fs from 'fs'
import readline from 'readline'
import { processLine } from './process-line'
import { generateReport } from './generate-report'

let ipCounts = new Map<string, number>()
let urlCounts = new Map<string, number>()

const readStream = readline.createInterface({
  input: fs.createReadStream('./example-data.log'),
  crlfDelay: Infinity,
})

readStream.on('line', (line) => {
  const reportData = processLine(line, urlCounts, ipCounts)
  ipCounts = reportData.ipCounts
  urlCounts = reportData.urlCounts
})

readStream.on('close', () => {
  console.log('File reading finished.')

  const { uniqueIPs, topVisitedURLs, topActiveIPs } = generateReport(urlCounts, ipCounts)

  console.log('Number of Unique IP Addresses:', uniqueIPs)
  console.log('Top 3 Most Visited URL Paths:', topVisitedURLs)
  console.log('Top 3 Most Active IP Addresses:', topActiveIPs)
})
