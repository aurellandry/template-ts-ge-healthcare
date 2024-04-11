import { Vector2D } from "./Vector2D";

export class Matrix3 {
  constructor(public data: number[][]) { }

  static identity(): Matrix3 {
    return new Matrix3([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]);
  }

  static translation(tx: number, ty: number): Matrix3 {
    return new Matrix3([
      [1, 0, tx],
      [0, 1, ty],
      [0, 0, 1]
    ]);
  }

  static rotation(theta: number): Matrix3 {
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);
    return new Matrix3([
      [cosTheta, -sinTheta, 0],
      [sinTheta, cosTheta, 0],
      [0, 0, 1]
    ]);
  }

  static scaling(sx: number, sy: number): Matrix3 {
    return new Matrix3([
      [sx, 0, 0],
      [0, sy, 0],
      [0, 0, 1]
    ]);
  }

  inverse(): Matrix3 {
    const det =
      this.data[0][0] * (this.data[1][1] * this.data[2][2] - this.data[2][1] * this.data[1][2]) -
      this.data[0][1] * (this.data[1][0] * this.data[2][2] - this.data[1][2] * this.data[2][0]) +
      this.data[0][2] * (this.data[1][0] * this.data[2][1] - this.data[1][1] * this.data[2][0]);

    if (det === 0) {
      throw new Error('Matrix is not invertible.');
    }

    const invDet = 1 / det;
    const result = [
      [
        (this.data[1][1] * this.data[2][2] - this.data[2][1] * this.data[1][2]) * invDet,
        (this.data[0][2] * this.data[2][1] - this.data[0][1] * this.data[2][2]) * invDet,
        (this.data[0][1] * this.data[1][2] - this.data[0][2] * this.data[1][1]) * invDet
      ],
      [
        (this.data[1][2] * this.data[2][0] - this.data[1][0] * this.data[2][2]) * invDet,
        (this.data[0][0] * this.data[2][2] - this.data[0][2] * this.data[2][0]) * invDet,
        (this.data[1][0] * this.data[0][2] - this.data[0][0] * this.data[1][2]) * invDet
      ],
      [
        (this.data[1][0] * this.data[2][1] - this.data[2][0] * this.data[1][1]) * invDet,
        (this.data[2][0] * this.data[0][1] - this.data[0][0] * this.data[2][1]) * invDet,
        (this.data[0][0] * this.data[1][1] - this.data[1][0] * this.data[0][1]) * invDet
      ]
    ];
    return new Matrix3(result);
  }

  multiply(matrix: Matrix3): Matrix3 {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result[i] = [];
      for (let j = 0; j < 3; j++) {
        let sum = 0;
        for (let k = 0; k < 3; k++) {
          sum += this.data[i][k] * matrix.data[k][j];
        }
        result[i][j] = sum;
      }
    }
    return new Matrix3(result);
  }

  transformPoint(point: Vector2D): Vector2D {
    const x = point.x * this.data[0][0] + point.y * this.data[0][1] + this.data[0][2];
    const y = point.x * this.data[1][0] + point.y * this.data[1][1] + this.data[1][2];
    return new Vector2D(x, y);
  }
}