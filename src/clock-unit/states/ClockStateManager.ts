import { Clock } from "../models/Clock";
import { EditableHourState } from "./EditableHourState";
import { EditableMinuteState } from "./EditableMinuteState";
import { ReadOnlyState } from "./ReadOnlyState";
import { State } from "./State";

export class ClockStateManager {
  private states: State[];
  private currentStateIndex: number;

  constructor(initialState: State) {
    const readOnlyState = new ReadOnlyState();
    const editableHourState = new EditableHourState();
    const editableMinuteState = new EditableMinuteState();

    this.states = [
      readOnlyState,
      editableHourState,
      editableMinuteState
    ];

    this.currentStateIndex = this.states.findIndex(state => {
      return state.constructor.name === initialState.constructor.name
    });
  }

  transitionToNextState(clock: Clock): void {
    this.currentStateIndex = (this.currentStateIndex + 1) % this.states.length;

    clock.setState(this.states[this.currentStateIndex]);
  }
}
