import {ViewGroup} from '../ViewGroup';
import {View} from '../View';
import {MTSquare} from '../../foundation/MTSquare';
import {MTRenderError} from '../../foundation/exceptions/MTRenderError';

export class LinearLayout extends ViewGroup {
  /**
   * Horizontal orientation
   * @type {number}
   */
  static HORIZONTAL = 0;

  /**
   * Vertical orientation
   * @type {number}
   */
  static VERTICAL = 1;

  /**
   * Linear layout orientation
   * @type {number}
   */
  protected orientation: number = LinearLayout.VERTICAL;

  /**
   * Sets layout views display direction
   * @param {number} orientation
   * @returns {LinearLayout}
   */
  public setOrientation(orientation: number): LinearLayout {
    this.orientation = orientation;
    return this;
  }

  /**
   * Returns layout views display direction
   * @returns {number}
   */
  public getOrientation(): number {
    return this.orientation;
  }

  public onLayout(changed: boolean, drawArea: MTSquare, drawAfterLayout = false, drawChildren: boolean = false) {
    super.onLayout(changed, drawArea, drawAfterLayout, false);

    if (
      (this.orientation !== LinearLayout.VERTICAL) &&
      (this.orientation !== LinearLayout.HORIZONTAL)
    )
      throw new MTRenderError('Unknown orientation value for LinearLayout');

    let nextPoint = 0;

    const isVertical = this.orientation === LinearLayout.VERTICAL;
    let nextArea = drawArea;

    this.views.forEach((view, index) => {
      view.onLayout(false, nextArea, false);

      const layout = view.getLayoutParams();
      const margins = view.getMargin();
      const size = view.getContentSize();

      this.drawChildView(view, index, nextArea);

      if (isVertical) {
        nextArea = nextArea.setY(margins.top + margins.bottom + size.y);
      } else {
        nextArea = nextArea.setX(margins.left + margins.right + size.x);
      }
    });
  }

  protected drawChildView(view: View, index: number, drawArea: MTSquare) {

    view.onDraw(drawArea);
  }
}
