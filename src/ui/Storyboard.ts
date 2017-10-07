import {UIEvent, EventEmitter, UIMouseEvent} from '../events';
import {Version} from '../helpers';
import {isset} from '../helpers';
import {Point} from './types/Point';
import {UIComponent} from './UIComponent';
import {ComponentMapper} from './ComponentMapper';
import {Collection} from './types/Collection';
import { MTRenderError, MentholException } from '../foundation';

import { isNil } from 'lodash';
import {ViewportInformation} from './ViewportInformation';

/**
 * A class to create, configure, display and control
 * user interface
 */
export class Storyboard extends EventEmitter {
  /**
   * List of children components
   */
  public controls: Collection;

  /**
   * Canvas that used to display UI
   */
  protected renderTarget: HTMLCanvasElement = null;

  /**
   * Information about user display
   * @type {any}
   */
  protected display: ViewportInformation = null;

  /**
   * Map with UI bindings
   */
  private _map: ComponentMapper;

  /**
   * Get size of view
   * @returns {Point}
   */
  public get size(): Point {
    const styles = window.getComputedStyle(this.renderTarget);

    return new Point(parseInt(styles.width), parseInt(styles.height));
  }

  /**
   * Storyboard height
   * @returns {number}
   */
  public get height(): number {
    return this.canvas.height;
  }

  /**
   * Storyboard width
   */

  public get width(): number {
    return this.canvas.width;
  }

  get context() {
    return this.canvas.getContext('2d');
  }

  get mapper() {
    return this._map;
  }

  public get canvas(): HTMLCanvasElement {
    return this.renderTarget;
  }

  /**
   * Bind canvas element to the storyboard
   * @param {HTMLCanvasElement} canvas
   */
  public set canvas(canvas: HTMLCanvasElement) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new MTRenderError('Passed argument is not HTMLCanvasElement');
    }

    if (!isNil(this.canvas)) {
      throw new MTRenderError('Canvas already defined');
    }

    this.display = new ViewportInformation(canvas);
    this.renderTarget = canvas;
  }

  /**
   * Redraw screen
   * @param force
   */
  public redrawContext(force) {
    this._emit('redraw', new UIEvent(this, {'force': force}));
  }

  public registerElement(element: UIComponent) {
    this.mapper.register(element);
  }

  public getElementById(id: string) {
    return this._map.getElementById(id);
  }

  public clear(): Storyboard {
    this.context.clearRect(0, 0, this.width, this.height);
    return this;
  }

  public constructor() {
    super();

    this.controls = new Collection(null, this);
  }

  /**
   * Storyboard create lifecycle hook
   */
  public onCreate() {
    if (isNil(this.canvas)) {
      throw new MTRenderError('Cannot create storyboard - canvas is not defined');
    }

    this._emit('drawStart', new UIEvent(this, {}));

    this._map = new ComponentMapper(this);

    this.on('redraw', function () {
      this.onDraw();
    });

    this._map.load();
  }

  /**
   * Storyboard start lifecycle hook
   */
  public onStart() {

  }

  /**
   * On layout draw hook
   */
  public onDraw() {
    this.clear();
    this.controls.forEach(function (e: UIComponent) {
      e.redraw();
    });
  }

  /**
   * Storyboard on resume lifecycle hook
   */
  public onResume() {

  }

  /**
   * Storyboard on pause lifecycle hook
   */
  public onPause() {

  }

  /**
   * Storyboard on stop lifecycle hook
   */
  public onStop() {

  }

  /**
   * Storyboard destroy lifecycle hook
   */
  public onDestroy() {

  }

  /**
   * Sync absolute height and width of canvas with view resolution
   * @returns {Storyboard}
   */
  public syncCanvasBounds(): Storyboard {
    const { x, y } = this.size;
    const ratio = this.display.pixelRatio;

    this.canvas.height = y * ratio;
    this.canvas.width = x * ratio;

    // Fix for HiDPI and Retina displays
    this.canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);

    this.redrawContext(true);
    return this;
  }
}
