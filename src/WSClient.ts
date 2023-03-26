import { ClientMessage } from "./models/client_messages";
import {
  ClientMessageType,
  Instrument,
  OrderSide,
  ServerMessageType,
} from "./enums";
import { ServerEnvelope } from "./models/server_messages";

export class WSConnector {
  url: string;
  connection: WebSocket | undefined;

  constructor(url: string) {
    this.url = url;
    this.connection = undefined;
  }

  connect = () => {
    this.connection = new WebSocket(this.url);

    this.connection.onopen = () => {
      console.log("пользователь подключился");
    };

    this.connection.onclose = () => {
      this.connection = undefined;
    };

    this.connection.onerror = () => {};

    this.connection.onmessage = (event) => {
      const message: ServerEnvelope = JSON.parse(event.data);
      console.log(message);

      // switch (message.messageType) {
      //   case ServerMessageType.success:
      //     break;
      //   case ServerMessageType.error:
      //     break;
      //   case ServerMessageType.executionReport:
      //     break;
      //   case ServerMessageType.marketDataUpdate:
      //     break;
      // }
    };
  };

  disconnect = () => {
    this.connection?.close();
  };

  send = (message: ClientMessage) => {
    this.connection?.send(JSON.stringify(message));
  };

  subscribeMarketData = (instrument: Instrument) => {
    this.send({
      messageType: ClientMessageType.subscribeMarketData,
      message: {
        instrument,
      },
    });
  };

  unsubscribeMarketData = (subscriptionId: string) => {
    this.send({
      messageType: ClientMessageType.unsubscribeMarketData,
      message: {
        subscriptionId,
      },
    });
  };

  placeOrder = (
    instrument: Instrument,
    side: OrderSide,
    amount: string,
    price: string
  ) => {
    this.send({
      messageType: ClientMessageType.placeOrder,
      message: {
        instrument,
        side,
        amount,
        price,
      },
    });
  };
}
