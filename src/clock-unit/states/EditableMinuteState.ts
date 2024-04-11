import { Clock } from "../models/Clock";
import { State } from "./State";

export class EditableMinuteState implements State {
  increase(clock: Clock): void {
    clock.increaseMinute();
  }
}
