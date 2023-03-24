class MockWebSocket {
  constructor(url) {
    this.url = url;
    this.readyState = MockWebSocket.CONNECTING;
    this.listeners = {
      open: [],
      message: [],
      error: [],
      close: []
    };
  }

  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  addEventListener(event, listener) {
    this.listeners[event].push(listener);
  }

  removeEventListener(event, listener) {
    const index = this.listeners[event].indexOf(listener);
    if (index > -1) {
      this.listeners[event].splice(index, 1);
    }
  }

  simulateOpen() {
    this.readyState = MockWebSocket.OPEN;
    this.listeners['open'].forEach(listener => listener());
  }

  simulateMessage(data) {
    this.listeners['message'].forEach(listener => listener({ data }));
  }

  simulateError(error) {
    this.readyState = MockWebSocket.CLOSED;
    this.listeners['error'].forEach(listener => listener(error));
    this.listeners['close'].forEach(listener => listener({ code: 1006, reason: 'WebSocket error', wasClean: false }));
  }

  simulateClose() {
    this.readyState = MockWebSocket.CLOSED;
    this.listeners['close'].forEach(listener => listener({ code: 1000, reason: 'WebSocket closed normally', wasClean: true }));
  }
}

global.WebSocket = MockWebSocket; // or window.WebSocket if you're in a browser context


const ws = new WebSocket('ws://example.com');

ws.addEventListener('open', () => {
  console.log('WebSocket opened');
});

ws.addEventListener('message', event => {
  console.log(`WebSocket message received: ${event.data}`);
});

ws.addEventListener('error', error => {
  console.error('WebSocket error:', error);
});

ws.addEventListener('close', event => {
  console.log(`WebSocket closed with code ${event.code} and reason "${event.reason}"`);
});

// To simulate events, you can call the corresponding methods on the mock WebSocket:
ws.simulateOpen();
ws.simulateMessage('Hello, world!');
ws.simulateError(new Error('Something went wrong'));
ws.simulateClose();
