import { Hour } from "./Hour";
import { Minute } from "./Minute";
import { ClockState } from "../states/ClockState";

export class Clock {
  private hour: Hour;
  private minute: Minute;
  private state: ClockState;

  constructor(hour: Hour, minute: Minute) {
    this.hour = hour;
    this.minute = minute;
    this.state = ClockState.ReadOnly;
  }

  increaseTime(): void {
    if (this.state === ClockState.EditableHour) {
      this.increaseHour();
    }
    if (this.state === ClockState.EditableMinute) {
      this.increaseMinute();
    }
  }

  increaseHour(): void {
    this.hour.increase();
  }

  increaseMinute(): void {
    this.minute.increase();
    if (this.minute.getValue() === 0) {
      this.increaseHour();
    }
  }

  getHours(): number {
    return this.hour.getValue();
  }

  getMinutes(): number {
    return this.minute.getValue();
  }

  getState(): ClockState {
    return this.state;
  }

  toggleState(): void {
    switch (this.state) {
      case ClockState.EditableHour:
        this.state = ClockState.EditableMinute;
        break;
      case ClockState.EditableMinute:
        this.state = ClockState.ReadOnly;
        break;
      case ClockState.ReadOnly:
        this.state = ClockState.EditableHour;
        break;
    }
  }
}