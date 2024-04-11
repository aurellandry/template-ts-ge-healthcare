export class Hour {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  increase() {
    this.value = (this.value + 1) % 24;
  }

  getValue(): number {
    return this.value;
  }
}