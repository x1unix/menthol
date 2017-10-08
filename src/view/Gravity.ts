/**
 * Standard constants and tools for placing an object within a potentially larger container.
 */
export class Gravity {

  /**
   * Push object to the bottom of its container, not changing its size.
   * @type {number}
   */
  static BOTTOM = 80;

  /**
   * Place the object in the center of its container in both the vertical and horizontal axis, not changing its size.
   * @type {number}
   */
  static CENTER = 17;

  /**
   * Place object in the horizontal center of its container, not changing its size.
   * @type {number}
   */
  static CENTER_HORIZONTAL = 1;

  /**
   * Place object in the vertical center of its container, not changing its size.
   * @type {number}
   */
  static CENTER_VERTICAL = 16;

  /**
   * Flag to clip the edges of the object to its container along the horizontal axis.
   * @type {number}
   */
  static CLIP_HORIZONTAL = 8;

  /**
   * Flag to clip the edges of the object to its container along the vertical axis.
   * @type {number}
   */
  static CLIP_VERTICAL = 128;

  /**
   * Push object to x-axis position at the end of its container, not changing its size.
   * @type {number}
   */
  static END = 8388613;

  /**
   * Grow the horizontal and vertical size of the object if needed so it completely fills its container.
   * @type {number}
   */
  static FILL = 119;

  /**
   * Grow the horizontal size of the object if needed so it completely fills its container.
   * @type {number}
   */
  static FILL_HORIZONTAL = 7;

  /**
   * Grow the vertical size of the object if needed so it completely fills its container.
   * @type {number}
   */
  static FILL_VERTICAL = 112;

  /**
   * Push object to the left of its container, not changing its size.
   * @type {number}
   */
  static LEFT = 3;

  /**
   * Constant indicating that no gravity has been set
   * @type {number}
   */
  static NO_GRAVITY = 0;

  /**
   * Push object to the right of its container, not changing its size.
   * @type {number}
   */
  static RIGHT = 5;

  /**
   * Push object to x-axis position at the start of its container, not changing its size.
   * @type {number}
   */
  static START = 838861;

  /**
   * Push object to the top of its container, not changing its size.
   * @type {number}
   */
  static TOP = 48;
}
