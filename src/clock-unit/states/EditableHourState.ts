import { Clock } from "../models/Clock";
import { State } from "./State";

export class EditableHourState implements State {
  increase(clock: Clock): void {
    clock.increaseHour();
  }
}
