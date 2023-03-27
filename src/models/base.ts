import Decimal from "decimal.js";
import { ClientMessage } from "./client_messages";
import { ServerMessage } from "./server_messages";

export interface Envelope {
  messageType: ClientMessage | ServerMessage;
  message: object;
}

export interface Message {}

export interface Quote {
  bid: Decimal;
  offer: Decimal;
  minAmount: Decimal;
  maxAmount: Decimal;
}
