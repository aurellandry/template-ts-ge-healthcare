import { Matrix3 } from "../math/Matrix3";
import { Vector2D } from "../math/Vector2D";

export class ClockAnimation {
  constructor(
    private readonly clockElement: HTMLElement
  ) {
  }

  rotateAroundPoint(duration: number, rotationPoint: Vector2D = null, angle: number = 360) {
    const originalTransform = window.getComputedStyle(this.clockElement).transform;
    if (!rotationPoint) {
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;
      rotationPoint = new Vector2D(
        Math.random() * viewportWidth,
        Math.random() * viewportHeight
      );
    }

    this.clockElement.style.transformOrigin = `${rotationPoint.x}px ${rotationPoint.y}px`;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const fraction = Math.min(elapsedTime / duration, 1);
      const currentAngle = angle * fraction;

      const rotationMat = Matrix3.rotation(currentAngle);

      const cssTransform = `matrix(${rotationMat.data[0][0]}, ${rotationMat.data[1][0]}, ${rotationMat.data[0][1]}, ${rotationMat.data[1][1]}, 0, 0)`;
      this.clockElement.style.transform = cssTransform;

      if (fraction < 1) {
        requestAnimationFrame(animate);
      } else {
        this.clockElement.style.transformOrigin = "50% 50%";
        this.clockElement.style.transform = originalTransform === "none" ? "" : originalTransform;
      }
    };

    requestAnimationFrame(animate);
  }
}
