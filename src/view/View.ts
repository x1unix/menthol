///<reference path="../foundation/MTPoint.ts"/>
import {Storyboard} from '../ui/Storyboard';
import {Point} from '../ui/types/Point';
import {ViewGroup} from './ViewGroup';
import {LayoutParams} from './LayoutParams';
import {MTNotImplementedException} from '../foundation/exceptions/MTNotImplementedException';
import {MTEventEmitter} from '../foundation/MTEventEmitter';
import {MTSquare} from '../foundation/MTSquare';
import {MTPoint} from '../foundation/MTPoint';
import {MTClickEvent} from './events/MTClickEvent';

/**
 * This class represents the basic building block for user interface components.
 * A View occupies a rectangular area on the screen and is responsible for drawing and event handling.
 * View is the base class for widgets, which are used to create interactive UI components (buttons, text fields, etc.).
 * The ViewGroup subclass is the base class for layouts,
 * which are invisible containers that hold other Views (or other ViewGroups) and define their layout properties.
 *
 * @ref https://developer.android.com/reference/android/view/View.html
 */
export abstract class View {

  /**
   * This view is invisible, and it doesn't take any space for layout purposes
   * @type {number}
   */
  static GONE = 8;

  /**
   * This view is invisible, but it still takes up space for layout purposes.
   * @type {number}
   */
  static INVISIBLE = 4;

  /**
   * The view is visible
   * @type {number}
   */
  static VISIBLE = 0;

  /**
   * The view's visibility status
   * @type {number}
   */
  protected visibility = 0;

  /**
   * Real view width
   * @type {number}
   */
  protected width = 0;

  /**
   * Real view height
   * @type {number}
   */
  protected height = 0;

  /**
   * X axis position
   * @type {number}
   */
  protected x = 0;

  /**
   * Y axis position
   * @type {number}
   */
  protected y = 0;

  /**
   * View position on screen's X axis
   * @type {number}
   */
  protected screenX = 0;

  /**
   * View position on screen's Y axis
   * @type {number}
   */
  protected screenY = 0;

  /**
   * View's z-index on storyboard
   * @type {number}
   */
  protected zIndex = 0;

  /**
   * View layout params
   * @type {LayoutParams}
   */
  protected layoutParams: LayoutParams = new LayoutParams();

  /**
   * View mount event
   * @type {any}
   */
  protected mount: MTEventEmitter<null> = null;

  /**
   * View click event
   * @type {any}
   */
  protected click: MTEventEmitter<MTClickEvent> = null;

  /**
   * View focus lost event
   * @type {any}
   */
  protected focusLost: MTEventEmitter<any> = null;

  /**
   * Mouse over view event
   * @type {any}
   */
  protected mouseOver: MTEventEmitter<MTPoint> = null;

  /**
   * Mouse leave view event
   * @type {any}
   */
  protected mouseLeave: MTEventEmitter<null> = null;

  /**
   * View became selected event
   * @type {any}
   */
  protected setSelected: MTEventEmitter<any> = null;

  /**
   * View constructor
   * @param {Storyboard} context Context
   * @param {ViewGroup} parentGroup Parent view group
   */
  constructor(public context: Storyboard, protected parentGroup: ViewGroup = null) {
    // Initialize events
    this.click = new MTEventEmitter(this);
    this.focusLost = new MTEventEmitter(this);
    this.setSelected = new MTEventEmitter(this);
    this.mouseOver = new MTEventEmitter(this);
    this.mouseLeave = new MTEventEmitter(this);
    this.mount = new MTEventEmitter(this);

    // Initialize z-index
    this.zIndex = parentGroup.getZIndex() + 1;
  }

  /**
   * Dispatch mouse over event
   * @param {MTPoint} position
   */
  dispatchMouseOverEvent(position: MTPoint) {
    this.mouseOver.dispatchEvent(position);
  }

  /**
   * Dispatch mouse leave event
   */
  dispatchMouseLeaveEvent() {
    this.mouseLeave.dispatchEvent(null);
  }

  /**
   * Dispatch click event
   * @param {MTClickEvent} event
   */
  dispatchClickEvent(event: MTClickEvent) {
    this.click.dispatchEvent(event);
  }

  /**
   * Get view's position
   * @returns {MTPoint}
   */
  getPosition(): MTPoint {
    return new MTPoint(this.x, this.y);
  }

  /**
   * Get view's position on storyboard
   * @returns {MTPoint}
   */
  getPositionOnScreen(): MTPoint {
    return new MTPoint(this.screenX, this.screenY);
  }

  /**
   * Gets z-index of the view on storyboard
   * @returns {number}
   */
  getZIndex(): number {
    return this.zIndex;
  }

  /**
   * Set view's height
   * @returns {number}
   */
  getHeight(): number {
    return this.height;
  }

  /**
   * Set view's height
   * @param {number} val
   */
  setHeight(val: number): View {
    this.height = val;
    return this;
  }

  /**
   * Get view's width
   * @returns {number}
   */
  getWidth(): number {
    return this.width;
  }

  /**
   * Set view's width
   * @param {number} val
   */
  setWidth(val: number): View {
    this.width = val;
    return this;
  }

  /**
   * Get layout params
   * @returns {LayoutParams}
   */
  getLayoutParams(): LayoutParams {
    return this.layoutParams;
  }

  /**
   * Set layout params
   * @param {LayoutParams} params
   * @returns {View}
   */
  setLayoutParams(params: LayoutParams): View {
    this.layoutParams = params;
    return this;
  }

  /**
   * Set view's visibility
   * @param {number} visibility
   */
  setVisibility(visibility: number) {
    this.visibility = visibility;
  }

  /**
   * Get view's visibility
   * @returns {number}
   */
  getVisibility(): number {
    return this.visibility;
  }

  /**
   * Change the view's z order in the tree, so it's on top of other sibling views.
   */
  bringToFront() {
    throw new MTNotImplementedException();
  }

  /**
   * Get view bounds on view group
   * @returns {MTSquare}
   */
  getViewBounds(): MTSquare {
    return new MTSquare(this.x, this.y, this.height, this.width);
  }

  /**
   * Get view bounds on storyboard
   * @returns {MTSquare}
   */
  getViewStoryboardBounds(): MTSquare {
    return new MTSquare(this.screenX, this.screenY, this.height, this.width);
  }

  private updateLayout() {

  }

}
