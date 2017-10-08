import {View} from './View';
import {MTLayoutError} from '../foundation/index';

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


}
