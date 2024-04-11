import './index.css';
import { ClockView } from './clock-unit/views/ClockView';
import { Vector2D } from './clock-unit/math/Vector2D';
import { ClockAnimation } from './clock-unit/views/ClockAnimation';

const addClockButton = document.getElementById('add-clock-button')!;
const timezoneInput = document.getElementById('timezone-input')! as HTMLInputElement;

addClockButton.addEventListener('click', () => {
  const timezoneOffset = isNaN(parseInt(timezoneInput.value)) ? 1 : parseInt(timezoneInput.value);
  const newClockView = new ClockView('clocks-container', timezoneOffset);
  newClockView.render();
});

const clockView = new ClockView('clocks-container', (new Date().getTimezoneOffset() / (-60)));
clockView.render();

const animatedClockView = new ClockView('animation', (new Date().getTimezoneOffset() / (-60)));
animatedClockView.render();

const animatedClockElt = animatedClockView.getClockContainer().querySelector('.clock') as HTMLInputElement;
const rotationPoint = new Vector2D(450, 280);
const duration = 1000000;
const clockAnimation = new ClockAnimation(animatedClockElt);

clockAnimation.rotateAroundPoint(duration, rotationPoint);
// animatedClockElt.classList.add('spin');
