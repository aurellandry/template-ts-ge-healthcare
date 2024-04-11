import { ClockFactory } from "../factory/ClockFactory";
import { Clock } from "../models/Clock";
import { ClockObserver } from "../observers/ClockObserver";

export class ClockView {
  private timezoneOffset: number;
  private time: Clock;
  private readonly container: HTMLDivElement;
  private readonly clockActionsContainer: HTMLDivElement;
  private readonly timeDisplayContainer: HTMLDivElement;
  private readonly clockElementContainer: HTMLDivElement;
  private observer: ClockObserver;

  constructor(containerId: string, timezoneOffset: number = 0) {
    this.timezoneOffset = timezoneOffset;
    this.time = ClockFactory.create(new Date().getUTCHours() + this.timezoneOffset, new Date().getMinutes());
    this.observer = new ClockObserver();
    this.observer.subscribe(this.displayTime);

    this.container = document.getElementById(containerId) as HTMLDivElement;

    this.clockActionsContainer = document.createElement('div');
    this.clockActionsContainer.classList.add('clock-actions-container');

    this.clockElementContainer = document.createElement('div');
    this.clockElementContainer.classList.add('clock');

    this.timeDisplayContainer = document.createElement('div');
  }

  render() {
    this.container.appendChild(this.clockElementContainer);

    this.timeDisplayContainer.textContent = this.getTimeString();
    this.clockElementContainer.appendChild(this.timeDisplayContainer);

    this.createButton('Mode', this.onModeClickHandler.bind(this));
    this.createButton('Increase', this.onIncreaseClickHandler.bind(this));
    this.createButton('Light switch', this.onLightswitchClickHandler.bind(this));
    this.clockElementContainer.appendChild(this.clockActionsContainer);
  }

  onModeClickHandler(): void {
    this.time.toggleState();
    this.displayTime();
  }

  onLightswitchClickHandler(): void {
    const isLightOn = this.clockElementContainer.classList.contains('light-on');

    if (isLightOn) {
      this.clockElementContainer.classList.remove('light-on');
    }
    else {
      this.clockElementContainer.classList.add('light-on');
    }
  }

  onIncreaseClickHandler(): void {
    this.time.increaseTime();
    this.displayTime();
  }

  private createButton(text: string, onClick: () => void) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    this.clockActionsContainer.appendChild(button);
  }

  private displayTime() {
    this.timeDisplayContainer.textContent = this.getTimeString();
  }

  private getTimeString(): string {
    return `${this.time.getHours().toString().padStart(2, '0')}:${this.time.getMinutes().toString().padStart(2, '0')}`;
  }
}