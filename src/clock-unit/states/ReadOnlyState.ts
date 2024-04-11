import { Clock } from "../models/Clock";
import { State } from "./State";

export class ReadOnlyState implements State {
  increase(clock: Clock): void {
    // Nothing to do
  }
}
