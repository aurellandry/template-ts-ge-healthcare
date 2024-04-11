import { ClockFactory } from "../factory/ClockFactory";
import { Clock } from "../models/Clock";
import { ClockStateManager } from "../states/ClockStateManager";

export class ClockView {
  private timezoneOffset: number;
  private clock: Clock;
  private readonly container: HTMLDivElement;
  private readonly clockActionsContainer: HTMLDivElement;
  private readonly timeDisplayContainer: HTMLDivElement;
  private readonly clockElementContainer: HTMLDivElement;
  private readonly clockStateManager: ClockStateManager;

  constructor(containerId: string, timezoneOffset: number = 0) {
    this.timezoneOffset = timezoneOffset;
    this.resetClock();

    this.clockStateManager = new ClockStateManager(this.clock.getState());

    this.container = document.getElementById(containerId) as HTMLDivElement;

    this.clockActionsContainer = document.createElement('div');
    this.clockActionsContainer.classList.add('clock-actions-container');

    this.clockElementContainer = document.createElement('div');
    this.clockElementContainer.classList.add('clock');

    this.timeDisplayContainer = document.createElement('div');
    this.timeDisplayContainer.classList.add('time-display');
    this.timeDisplayContainer.classList.add('light-off');
  }

  render() {
    this.container.appendChild(this.clockElementContainer);

    this.timeDisplayContainer.textContent = this.clock.getTimeString();
    this.clockElementContainer.appendChild(this.timeDisplayContainer);

    this.createButton('Mode', this.onModeClickHandler.bind(this));
    this.createButton('Increase', this.onIncreaseClickHandler.bind(this));
    this.createButton('Light switch', this.onLightswitchClickHandler.bind(this));
    this.createButton('Reset', this.onResetClickHandler.bind(this));

    this.clockElementContainer.appendChild(this.clockActionsContainer);
  }

  getClockContainer(): HTMLDivElement {
    return this.container;
  }

  private onModeClickHandler(): void {
    this.clockStateManager.transitionToNextState(this.clock);
    this.displayTime();
  }

  private onLightswitchClickHandler(): void {
    const isLightOn = this.timeDisplayContainer.classList.contains('light-on');

    if (isLightOn) {
      this.timeDisplayContainer.classList.remove('light-on');
      this.timeDisplayContainer.classList.add('light-off');
    }
    else {
      this.timeDisplayContainer.classList.add('light-on');
      this.timeDisplayContainer.classList.remove('light-off');
    }
  }

  private onIncreaseClickHandler(): void {
    this.clock.increaseTime();
    this.displayTime();
  }

  private onResetClickHandler(): void {
    this.resetClock();
    this.displayTime();
  }

  private resetClock(): void {
    this.clock = ClockFactory.create(new Date().getUTCHours() + this.timezoneOffset, new Date().getMinutes());
  }

  private createButton(text: string, onClick: () => void) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    this.clockActionsContainer.appendChild(button);
  }

  private displayTime() {
    this.timeDisplayContainer.textContent = this.clock.getTimeString();
  }
}