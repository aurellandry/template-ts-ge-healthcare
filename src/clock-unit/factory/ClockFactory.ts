import { Clock } from "../models/Clock";
import { Hour } from "../models/Hour";
import { Minute } from "../models/Minute";

export class ClockFactory {
  static create(hours: number, minutes: number): Clock {
    return new Clock(new Hour(hours), new Minute(minutes));
  }
}