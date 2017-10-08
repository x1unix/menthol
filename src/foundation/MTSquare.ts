/**
 * Class represents square shape
 */
import {MTPoint} from './MTPoint';

export class MTSquare {

  /**
   * Create a new square area
   * @param {number} x Start left point
   * @param {number} y Start top point
   * @param {number} height
   * @param {number} width
   */
  constructor(
    public x: number,
    public y: number,
    public height: number,
    public width: number
  ) {}

  getTopLeftPoint(): MTPoint {
    return new MTPoint(this.x, this.y);
  }

  getTopRightPoint(): MTPoint {
    return new MTPoint(this.x + this.width, this.y);
  }

  getBottomLeftCorner(): MTPoint {
    return new MTPoint(this.x, this.y + this.height);
  }

  getBottomRightCorner(): MTPoint {
    return new MTPoint(this.x + this.width, this.y + this.height);
  }

  isInBounds(x: number, y: number): boolean {
    const maxX = this.x + this.width,
          maxY = this.y + this.height;

    return ((x <= this.x) && (x >= maxX) && (y <= this.y) && (y >= maxY));
  }

  isPointInBounds(point: MTPoint): boolean {
    const { x, y } = point;

    return this.isInBounds(x, y);
  }
}
