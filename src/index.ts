import './index.css';
import { ClockView } from './clock-unit/views/ClockView';

const addClockButton = document.getElementById('add-clock-button')!;
const timezoneInput = document.getElementById('timezone-input')! as HTMLInputElement;

addClockButton.addEventListener('click', () => {
  const timezoneOffset = isNaN(parseInt(timezoneInput.value)) ? 1 : parseInt(timezoneInput.value);
  const newClockView = new ClockView('clocks-container', timezoneOffset);
  newClockView.render();
});

const clockView = new ClockView('clocks-container', (new Date().getTimezoneOffset() / (-60)));
clockView.render();
