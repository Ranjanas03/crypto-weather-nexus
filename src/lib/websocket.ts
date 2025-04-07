type PriceUpdateCallback = (data: { [key: string]: number }) => void

export function connectToCryptoWebSocket(onMessage: PriceUpdateCallback) {
  const socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum')

  socket.onmessage = (msg: MessageEvent) => { // Explicitly type the msg parameter
    const rawData = JSON.parse(msg.data) as { [key: string]: string } // Explicitly type the parsed data
    const parsedData: { [key: string]: number } = {}

    for (const key in rawData) {
      parsedData[key] = parseFloat(rawData[key]) // Safely convert the string to a number
    }

    onMessage(parsedData) // Now it's the correct type
  }

  socket.onerror = (err) => {
    console.error('WebSocket error:', err)
  }

  socket.onclose = (event) => {
    console.warn('WebSocket closed:', event)
  }

  return socket
}
