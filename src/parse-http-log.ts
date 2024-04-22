export interface ParsedLog {
  ip: string
  user: string | null // not needed for the requirement
  url: {
    method: string
    path: string
    protocol: string
  }
}

export function parseHttpLog(logLine: string): ParsedLog | null {
  const regexPattern = /^(\S+) (\S+) (\S+) \[([\w:/]+\s[+\-]\d{4})\] "(\S+)\s?(\S+)?\s?(\S+)?" (\d{3}) (\d+|\S+)/
  const match = logLine.match(regexPattern)

  if (match) {
    // Note: some of these variables are not used and will fail on strict linting
    // (eg: logname, timestamp, status, bytes, url)
    // I put it below just for demonstration purpose
    const [, ip, logname, user, timestamp, method, path, protocol, statusStr, bytesStr] = match

    const username = user !== '-' ? user : null

    // const url = `${method} ${path} ${protocol}`

    return {
      ip,
      user: username,
      url: {
        method,
        path,
        protocol,
      },
    }
  } else {
    return null // Log line doesn't match the pattern
  }
}
