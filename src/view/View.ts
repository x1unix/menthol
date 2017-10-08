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
import {MTColor} from '../foundation/MTColor';

import {isNil} from 'lodash';
import {MTBox} from '../foundation/MTBox';

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
   * View's padding
   * @type {[number , number , number , number]}
   */
  protected padding: number[] = [0, 0, 0, 0];

  /**
   * View's margin
   * @type {[number , number , number , number]}
   */
  protected margin: number[] = [0, 0, 0, 0];

  /**
   * Set view's background color
   * @type {MTColor}
   */
  protected backgroundColor: MTColor = new MTColor();

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
   * Get view's background color
   * @returns {MTColor}
   */
  getBackgroundColor(): MTColor {
    return this.backgroundColor;
  }

  /**
   * Set view's background color
   * @param {MTColor} color
   * @returns {View}
   */
  setBackgroundColor(color: MTColor): View {
    this.backgroundColor = color;
    this.updateLayout();
    return this;
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
    this.layoutParams.height = val;
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
    this.layoutParams.height = val;
    return this;
  }

  /**
   * Set z-index
   * @param {number} index
   * @param {boolean} dedraw
   * @returns {View}
   */
  setZIndex(index: number, dedraw: boolean = true): View {
    this.zIndex = index;

    if (dedraw) {
      this.updateLayout();
    }

    return this;
  }

  /**
   * Gets view's z-index
   * @returns {number}
   */
  getZIndex(): number {
    return this.zIndex;
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

  /**
   * Set views padding
   * @param {number} top
   * @param {number} right
   * @param {number} bottom
   * @param {number} left
   */
  setPadding(top: number, right: number, bottom: number, left: number) {
    this.padding = [top, right, bottom, left];
    this.updateLayout();
  }

  /**
   * Get view's padding
   * @returns {number[]}
   */
  getPadding(): MTBox {
    return MTBox.fromArray(this.padding);
  }

  /**
   * Set views margin
   * @param {number} top
   * @param {number} right
   * @param {number} bottom
   * @param {number} left
   */
  setMargin(top: number, right: number, bottom: number, left: number) {
    this.margin = [top, right, bottom, left];
    this.updateLayout();
  }

  /**
   * Get view's margin
   * @returns {number[]}
   */
  getMargin(): MTBox {
    return MTBox.fromArray(this.margin);
  }

  /**
   * Get view's drawable area including margins
   * @returns {MTSquare}
   */
  getDrawableArea(): MTSquare {
    const b = this.getViewBounds();
    const m = this.getMargin();

    return new MTSquare(b.x + m.left, b.y + m.top, b.height - m.bottom, b.width - m.right);
  }

  /**
   * Get view's content size
   * @returns {MTPoint}
   */
  getContentSize(): MTPoint {
    return new MTPoint(this.width, this.height);
  }

  /**
   * Callback for layout setup event.
   * Used to configure view's bounds and layout
   *
   * @param {boolean} changed
   * @param {MTSquare} drawArea
   */
  public onLayout(changed: boolean, drawArea: MTSquare) {
    const hasNoParent = isNil(this.parentGroup);
    const maxViewBounds = hasNoParent ? this.context.getViewBounds() : this.parentGroup.getViewBounds();

    // Determine view's height
    switch (this.layoutParams.height) {
      case LayoutParams.MATCH_PARENT:
        this.height = maxViewBounds.height;
        break;

      case LayoutParams.FILL_PARENT:
        this.height = maxViewBounds.height;
        break;

      case LayoutParams.WRAP_CONTENT:
        this.height = this.getContentSize().y;
        break;

      default:
        break;
    }

    // Determine view's height
    switch (this.layoutParams.width) {
      case LayoutParams.MATCH_PARENT:
        this.width = maxViewBounds.width;
        break;

      case LayoutParams.FILL_PARENT:
        this.width = maxViewBounds.width;
        break;

      case LayoutParams.WRAP_CONTENT:
        this.width = this.getContentSize().x;
        break;

      default:
        break;
    }


    this.x = maxViewBounds.x;
    this.y = maxViewBounds.y;

    const area = this.getDrawableArea();
    const canvas = this.context.getRenderingContext();
    this.OnDraw(area, canvas);
  }

  /**
   * Callback for paint event. Implement this to do your drawing.
   * @param {MTSquare} area Parent's view bounds
   * @param {CanvasRenderingContext2D} canvas Canvas rendering context
   * @constructor
   */
  protected OnDraw(area: MTSquare, canvas: CanvasRenderingContext2D) {
    canvas.fillStyle = this.backgroundColor.toString();
    canvas.fillRect(area.x, area.y, area.width, area.height);
  }

  private updateLayout() {

  }

}
