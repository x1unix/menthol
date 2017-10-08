/**
 * Class represents color
 */
export class MTColor {

  /**
   * MTColor constructor
   * @param {number} red Red color
   * @param {number} green Green color
   * @param {number} blue Blue color
   * @param {number} alpha Alpha channel (transparency)
   */
  constructor(
    public red: number = 255,
    public green: number = 255,
    public blue: number = 255,
    public alpha: number = 0
  ) {}

  toHex(): string {
    const colors = [this.red, this.green, this.blue];
    return colors.map((val: number) => this.componentToHex(val)).join('');
  }

  toString(): string {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }

  protected componentToHex(c: number): string {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  /**
   * Build color from hex string (#FFFFFF)
   * @param {string} hexColor
   * @returns {MTColor}
   */
  static fromHex(hexColor: string): MTColor {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);

    const r = parseInt(result[1], 16),
          g = parseInt(result[2], 16),
          b = parseInt(result[3], 16);

    return new MTColor(r, g, b);
  }


}
