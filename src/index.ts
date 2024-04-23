import fs from 'fs'
import readline from 'readline'
import { processLine } from './process-line'
import { generateReport } from './generate-report'

let ipCounts = new Map<string, number>()
let urlCounts = new Map<string, number>()

// we start by reading the file.
// Note that the input file is hardcoded here for demonstration purpose (this is not a prod approach)
// Ideally this would either come as an environment variable (dotenv), or cli input (ie. using yargs or the like), or if this is built as package then a variable to a function
const readStream = readline.createInterface({
  input: fs.createReadStream('./example-data.log'),
  crlfDelay: Infinity,
})

// Rather than leading the whole file, we are taking the "streaming" approach to read it by line and process it
// On each line (handle by the processLine function), we would: parse, and "index" the data according to the requirements (see further details within each children's functions)
readStream.on('line', (line) => {
  const reportData = processLine(line, urlCounts, ipCounts)
  ipCounts = reportData.ipCounts
  urlCounts = reportData.urlCounts
})

// This event will be called, when the stream has finished reading the whole file (the file has been closed from reading)
// This is where we would generate the data reports
readStream.on('close', () => {
  console.log('File reading finished.')

  const { uniqueIPs, topVisitedURLs, topActiveIPs } = generateReport(urlCounts, ipCounts)

  console.log('Number of Unique IP Addresses:', uniqueIPs)
  console.log('Top 3 Most Visited URL Paths:', topVisitedURLs)
  console.log('Top 3 Most Active IP Addresses:', topActiveIPs)
})
