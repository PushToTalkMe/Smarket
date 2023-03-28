export class MockWebSocket {
  url: string;
  readyState: number;
  listeners: {
    open: never[];
    message: never[];
    error: never[];
    close: never[];
  };

  constructor(url: string) {
    this.url = url;
    this.readyState = MockWebSocket.CONNECTING;
    this.listeners = {
      open: [],
      message: [],
      error: [],
      close: [],
    };
  }

  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  addEventListener(event: keyof typeof this.listeners, listener: never) {
    this.listeners[event].push(listener);
  }

  removeEventListener(event: keyof typeof this.listeners, listener: never) {
    const index = this.listeners[event].indexOf(listener);
    if (index > -1) {
      this.listeners[event].splice(index, 1);
    }
  }

  simulateOpen() {
    this.readyState = MockWebSocket.OPEN;
    console.log("Websocket open");
    this.listeners["open"].forEach((listener: () => void) => listener());
  }

  simulateMessage(data: any) {
    this.listeners["message"].forEach((listener: (arg0: any) => void) =>
      listener({ data })
    );
  }

  simulateError(error: any) {
    this.readyState = MockWebSocket.CLOSED;
    console.log("Websocket error");

    this.listeners["error"].forEach((listener: (arg0: any) => void) =>
      listener(error)
    );
    this.listeners["close"].forEach((listener: (arg0: any) => void) =>
      listener({
        code: 1006,
        reason: "Instrument/amount not specified",
        wasClean: false,
      })
    );
  }

  simulateClose() {
    this.readyState = MockWebSocket.CLOSED;
    this.listeners["close"].forEach((listener: (arg0: any) => void) =>
      listener({
        code: 1000,
        reason: "WebSocket closed normally",
        wasClean: true,
      })
    );
  }
}
