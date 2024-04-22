import { parseHttpLog, ParsedLog } from './parse-http-log'

describe('parseHttpLog function', () => {
  it('should parse a valid log line correctly', () => {
    const logLine = '72.44.32.10 - admin [09/Jul/2018:15:48:07 +0200] "GET / HTTP/1.1" 200 3574'
    const parsedLog: ParsedLog | null = parseHttpLog(logLine)

    expect(parsedLog).toBeTruthy()
    expect(parsedLog?.ip).toBe('72.44.32.10')
    expect(parsedLog?.user).toBe('admin')
    expect(parsedLog?.url.method).toBe('GET')
    expect(parsedLog?.url.path).toBe('/')
    expect(parsedLog?.url.protocol).toBe('HTTP/1.1')
  })

  it('should return null for invalid log line', () => {
    const logLine = 'Invalid log line'
    const parsedLog = parseHttpLog(logLine)

    expect(parsedLog).toBeNull()
  })

  it('should handle log lines with missing data', () => {
    const logLine = '127.0.0.1 - - [09/Jul/2018:15:48:07 +0200] "GET / HTTP/1.1" 200 -'
    const parsedLog: ParsedLog | null = parseHttpLog(logLine)

    expect(parsedLog).toBeTruthy()
    expect(parsedLog?.ip).toBe('127.0.0.1')
    expect(parsedLog?.user).toBeNull()
    expect(parsedLog?.url.method).toBe('GET')
    expect(parsedLog?.url.path).toBe('/')
    expect(parsedLog?.url.protocol).toBe('HTTP/1.1')
  })
})
