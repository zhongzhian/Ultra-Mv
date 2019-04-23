const baseDomain = '39.104.229.21'
const baseProtocol = 'http'
const basePort = 58055

export const REST_API = process.env.NODE_ENV === 'production' ? '' : `${baseProtocol}://${baseDomain}:${basePort}`

const {hostname, port, protocol} = window.location
console.log('>>> url', protocol, hostname, port)
const wsPrefix = protocol === 'http:' ? 'ws:' : 'wss:'
export const BROADCAST_WEB_SOCKET = process.env.NODE_ENV === 'production' ?
  `${wsPrefix}//${hostname}:${port-1}/ws` : `wss://${baseDomain}:${basePort-1}/ws`

