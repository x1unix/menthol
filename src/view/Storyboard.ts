import {UIEvent, EventEmitter, UIMouseEvent} from '../events';
import { MTRenderError, MentholException } from '../foundation';

import { isNil, isFunction } from 'lodash';
import {ViewportInformation} from './ViewportInformation';
import { Logger } from '../helpers/logs/Logger';
import {MTSquare} from '../foundation/MTSquare';
import {ViewGroup} from './ViewGroup';
import {MTPoint} from '../foundation/MTPoint';
import {MTObject} from '../foundation/MTObject';
import {MentholDebugProvider} from '../debug/MentholDebugProvider';
import {Menthol} from '../Menthol';


/**
 * A class to create, configure, display and control
 * user interface
 */
export class Storyboard extends MTObject {
  /**
   * List of children components
   */
  public rootView: ViewGroup;

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
   * If storyboard render started
   * @type {boolean}
   */
  protected started: boolean = false;

  /**
   * Current debug level
   * @type {number}
   */
  protected debugLevel = 0;

  protected renderLoopEnabled = true;


  /**
   * Map with UI bindings
   */
  // private _map: ComponentMapper;

  /**
   * Get size of view
   * @returns {Point}
   */
  public get size(): MTPoint {
    const styles = window.getComputedStyle(this.renderTarget);

    return new MTPoint(parseInt(styles.width), parseInt(styles.height));
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
    // return this._map;
    return null;
  }

  get log(): Logger {
    return Logger.main;
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


  public setDebugLevel(level: number): Storyboard {
    this.debugLevel = level;
    return this;
  }

  public getDebugLevel(): number {
    return this.debugLevel;
  }

  public matchDebugLevel(level: number): boolean {
    return this.debugLevel <= level;
  }

  /**
   * Redraw screen
   * @param force
   */
  public redrawContext(force) {
    this.clear();
    this.onDraw();
  }

  public setContentView(element: ViewGroup) {
    // this.mapper.register(element);
    this.rootView = element;
    this.log.info(this.className, 'Root content view has been changed');
    this.onStart();
  }

  public clear(): Storyboard {
    this.context.clearRect(0, 0, this.width, this.height);
    return this;
  }

  public constructor() {
    super();
  }

  /**
   * Storyboard create lifecycle hook
   */
  public onCreate() {
    if (isNil(this.canvas)) {
      throw new MTRenderError('Cannot create storyboard - canvas is not defined');
    }

    // this._emit('drawStart', new UIEvent(this, {}));
    //
    // this._map = new ComponentMapper(this);
    //
    // this.on('redraw', function () {
    //   this.onDraw();
    // });
    //
    // this._map.load();

    this.log.info(this.className, 'Storyboard created');
  }

  /**
   * Storyboard start lifecycle hook
   */
  public onStart() {
    this.started = true;

    if (this.debugLevel === MentholDebugProvider.DEBUG_CRITICAL) {
      this.renderLoopEnabled = false;
      this.log.warn(this.className, 'Storyboard started at critical debug mode. Render loop will be disabled!');
      this.onDraw();
    } else {
      this.log.info(this.className, 'Render loop started');

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.onPause();
        } else {
          this.onResume();
        }
      });

      this.requestFrame();
    }

  }

  protected requestFrame() {
    if (!this.renderLoopEnabled) return;

    const raf = isFunction(window.requestAnimationFrame) ? window.requestAnimationFrame : window.webkitRequestAnimationFrame;

    raf(() => this.onDraw());
  }


  /**
   * On layout draw hook
   */
  public onDraw() {
    if (!this.started) return;

    const size = this.size;
    const area: MTSquare = new MTSquare(0, 0, size.y, size.x);
    this.rootView.onLayout(true, area, true, true);

    if (this.renderLoopEnabled === true) {
      this.requestFrame();
    }
  }

  /**
   * Storyboard on resume lifecycle hook
   */
  public onResume() {
    this.started = true;
    this.log.info(this.className, 'Render loop resumed');
    this.requestFrame();
  }

  /**
   * Storyboard on pause lifecycle hook
   */
  public onPause() {
    this.started = false;
    this.log.info(this.className, 'Render loop paused');
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
    this.log.debug(this.className, `Syncing canvas bounds...`);

    const { x, y } = this.size;
    const ratio = this.display.pixelRatio;

    this.log.debug(this.className, `Screen: ${x}x${y} (ratio: ${ratio})`);

    this.canvas.height = y * ratio;
    this.canvas.width = x * ratio;

    // Fix for HiDPI and Retina displays
    this.canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);

    this.redrawContext(true);
    return this;
  }

  /**
   * Get storyboard's bounds
   * @returns {MTSquare}
   */
  public getViewBounds(): MTSquare {
    const size = this.size;
    return new MTSquare(0, 0, size.y, size.x);
  }

  /**
   * Returns rendering context
   * @returns {CanvasRenderingContext2D}
   */
  public getRenderingContext(): CanvasRenderingContext2D {
    return this.canvas.getContext('2d');
  }
}
