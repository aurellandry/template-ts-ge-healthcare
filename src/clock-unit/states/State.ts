import { Clock } from "../models/Clock";

export interface State {
  increase(clock: Clock): void;
}