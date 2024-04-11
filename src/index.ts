import './index.css';
import { ClockFactory } from './clock-unit/factory/ClockFactory';
import { ClockView } from './clock-unit/views/ClockView';

const currentTime = ClockFactory.create(new Date().getHours(), new Date().getMinutes());

const resetButton = document.getElementById('reset-button')!;
const addClockButton = document.getElementById('add-clock-button')!;
const timezoneInput = document.getElementById('timezone-input')! as HTMLInputElement;

resetButton.addEventListener('click', () => {
  currentTime.toggleState();
});

addClockButton.addEventListener('click', () => {
  const timezoneOffset = isNaN(parseInt(timezoneInput.value)) ? 1 : parseInt(timezoneInput.value);
  const newClockView = new ClockView('clocks-container', timezoneOffset);
  newClockView.render();
});

const clockView = new ClockView('clocks-container', (new Date().getTimezoneOffset() / (-60)));
clockView.render();
