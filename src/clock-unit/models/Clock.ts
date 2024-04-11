import { Hour } from "./Hour";
import { Minute } from "./Minute";
import { State } from "../states/State";
import { ReadOnlyState } from "../states/ReadOnlyState";

export class Clock {
  private hour: Hour;
  private minute: Minute;
  private state: State;

  constructor(hour: Hour, minute: Minute) {
    this.hour = hour;
    this.minute = minute;
    this.state = new ReadOnlyState();
  }

  increaseTime(): void {
    this.state.increase(this)
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

  getTimeString(): string {
    return `${this.getHours().toString().padStart(2, '0')}:${this.getMinutes().toString().padStart(2, '0')}`;
  }

  getState(): State {
    return this.state;
  }

  setState(state: State): void {
    this.state = state;
  }

  private getHours(): number {
    return this.hour.getValue();
  }

  private getMinutes(): number {
    return this.minute.getValue();
  }
}