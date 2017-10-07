import {UIEvent, EventEmitter, UIMouseEvent} from '../events';
import {Version} from '../helpers';
import {isset} from '../helpers';
import {Point} from './types/Point';
import {UIComponent} from './UIComponent';
import {ComponentMapper} from './ComponentMapper';
import {Collection} from './types/Collection';
import { MTRenderError, MentholException } from '../foundation';

import { isNil } from 'lodash';

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
  private renderTarget: HTMLCanvasElement = null;

  /**
   * Map with UI bindings
   */
  private _map: ComponentMapper;

  /**
   * Storyboard height
   * @returns {number}
   */
  public get height(): number {
    return this.canvas.height;
  }

  /**
   * Storyboard width
   * @param {number} v
   */
  public set height(v: number) {
    this.canvas.height = v;
  }

  public get width(): number {
    return this.canvas.width;
  }

  public set width(v: number) {
    this.canvas.width = v;
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
}
