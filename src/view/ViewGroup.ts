import {View} from './View';
import {MTLayoutError} from '../foundation/index';
import {isNil} from 'lodash';
import {MTSquare} from '../foundation/MTSquare';
import {MTNotImplementedException} from '../foundation/exceptions/MTNotImplementedException';

/**
 * Group of views. Used as layout controller
 */
export class ViewGroup extends View {
  protected views: View[] = [];

  /**
   * Add view to the view group
   * @param {View} view
   * @returns {ViewGroup}
   */
  addView(view: View): ViewGroup {
    if (this.hasView(view))
      throw new MTLayoutError('Cannot add view, view already exists');

    view.setZIndex(this.zIndex + 1, false);

    this.views.push(view);
    return this;
  }

  /**
   * Checks if a view is in the group
   * @param {View} view
   * @returns {boolean}
   */
  hasView(view: View): boolean {
    return this.views.indexOf(view) !== -1;
  }

  /**
   * Remove the view from view group
   * @param {View} view
   * @returns {ViewGroup}
   */
  removeView(view: View): ViewGroup {
    const index = this.views.indexOf(view);

    if (index === -1)
      throw new MTLayoutError('Cannot remove view from the group, the view is not in the group');

    this.views.splice(index, 1);

    return this;
  }

  /**
   * Callback for layout configure event
   * Configures ViewGroup's layout and children's layout
   * @param {boolean} changed
   * @param {MTSquare} drawArea
   * @param {boolean} drawAfterLayout Draw after layout
   * @param {boolean} drawChildren Draw children after configure
   */
  public onLayout(changed: boolean, drawArea: MTSquare, drawAfterLayout = false, drawChildren: boolean = false) {
    super.onLayout(changed, drawArea, drawAfterLayout);

    if (!drawChildren) return;

    this.views.forEach((view, index) =>
      this.drawChildView(view, index, drawArea)
    );
  }

  /**
   * Draw children content
   * @param {View} view Child
   * @param {number} index Index
   * @param {MTSquare} drawArea ViewGroup's draw area
   */
  protected drawChildView(view: View, index: number, drawArea: MTSquare) {
    throw new MTNotImplementedException('ViewGroup.drawViewChild must be inherited to draw children content');
  }


}
