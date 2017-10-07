import {UIEvent, EventEmitter, UIMouseEvent} from '../events';
import {Version} from '../helpers';
import {isset} from '../helpers';
import {Point} from './types/Point';
import {UIComponent} from './UIComponent';
import {ComponentMapper} from './ComponentMapper';
import {Collection} from './types/Collection';

/**
 * A class to create, configure, display and control
 * user interface
 */
export class Storyboard extends EventEmitter {
  /**
   * Root HTML element that holds canvas
   */
  private element: HTMLElement;

  /**
   * List of children components
   */
  public controls: Collection;

  /**
   * Canvas that used to display UI
   */
  public canvas: HTMLCanvasElement;

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


  public onCreate() {}


  get context() {
    return this.canvas.getContext('2d');
  }

  get mapper() {
    return this._map;
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

  /**
   * Create a new Storyboard on HTML element
   * @param {HTMLElement} handler HTML element handler
   * @param {Function} bootstrap On create callback
   */
  public constructor(handler: HTMLElement, bootstrap: Function) {
    super();

    let self = this;

    this.element = handler;
    this.canvas = document.createElement('canvas');
    this.canvas.tabIndex = 0;
    this.canvas.focus();


    Object.defineProperty(this.canvas, 'form', {
      value: self,
      enumerable: true,
      configurable: true
    });

    if (bootstrap) bootstrap.call(self, handler);

    this.element.appendChild(this.canvas);
    this.controls = new Collection(null, this);

    this._emit('drawStart', new UIEvent(this, {}));

    this._map = new ComponentMapper(this);

    this.on('redraw', function () {
      this.clear();
      this.controls.forEach(function (e: UIComponent) {
        e.redraw();
      });
    });

    this._map.load();
  }
}
