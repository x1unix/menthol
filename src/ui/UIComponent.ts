import {EventEmitter, PropertyChangedEvent, UIEvent, UIMouseEvent} from '../events';
import {isset} from '../helpers';
import {BoxModelElement} from './types/BoxModelElement';
import {Storyboard} from './Storyboard';
import {Collection} from './types/Collection';
import {GUID} from './types/GUID';
import {Point} from './types/Point';
import {Font} from './types/Font';


export class UIComponent extends EventEmitter {
  private __position__: Point;
  private owner: Storyboard;
  private _parent: UIComponent;
  private _context: CanvasRenderingContext2D;
  public controls: Collection;
  private _height: any = 128;
  private _width: any = 128;
  private _injected: boolean = false;
  private _backgroundColor: string = 'rgba(0,0,0,0)';
  private _foreColor: string = '#000';
  private _GUID: GUID;
  private _padding: BoxModelElement = new BoxModelElement();
  private _margin: BoxModelElement = new BoxModelElement();
  private _font: Font = new Font();

  public emit(eventName: string = 'emit', eventArgs: Object) {
    this._emit(eventName, eventArgs);
    if (this.hasParent()) this.parent.emit(eventName, eventArgs);
  }

  public broadcast(eventName: string = 'broadcast', eventArgs: Object, emitOnEvent: boolean = true) {
    if (emitOnEvent) this._emit(eventName, eventArgs);
    this.controls.forEach((element: UIComponent) => {
      element.broadcast(eventName, eventArgs);
    });
  }

  public react(eventName: string, eventArgs: Object) {
    this.broadcast('mouseover', eventArgs, false);
    this.emit('mouseover', eventArgs);
  }

  private _drawn: boolean = false;

  public get drawn(): boolean {
    return this._drawn;
  }


  public get padding(): BoxModelElement {
    return this._padding;
  }


  public get margin(): BoxModelElement {
    return this._margin;
  }


  public get font(): Font {
    return this._font;
  }

  public get id(): GUID {
    if (!this.hasId()) this._GUID = new GUID();
    return this._GUID;
  }

  public hasId(): boolean {
    return typeof this._GUID !== 'undefined';
  }


  public constructor(owner: Storyboard) {
    super();

    let self = this;

    this.owner = owner;
    this._context = owner.context;
    this.__position__ = new Point(0, 0);
    this.controls = new Collection(this, owner);

    function fnOnUpdate() {
      self._onUpdate();
    }

    let propEvent = 'propertyChange';

    // Redraw element on events
    this.on('layerUpdate', this._onUpdate);
    this.on('propertyChange', this._onUpdate);

    this._font.on(propEvent, fnOnUpdate);
    this._padding.on(propEvent, fnOnUpdate);
    this._margin.on(propEvent, fnOnUpdate);


  }

  get context(): CanvasRenderingContext2D {
    return this._context;
  }

  get isInjected(): boolean {
    return this._injected;
  }

  private _onUpdate() {
    if (!this.drawn) return;
    this.owner._emit('redraw', {relatedTarget: this});
  }

  /**
   * If point is in bounds of element
   *
   * @param {Point} location
   * @returns {boolean}
   */
  public inBoundsOf(location: Point) {
    let points = this.points();
    return (location.x >= points[0].x) && (location.x <= points[1].x) && (location.y >= points[0].y) && (location.y <= points[2].y);
  }


  /**
   * Colors
   */
  get backgroundColor(): string {
    return this._backgroundColor;
  }

  set backgroundColor(newColor: string) {
    let old = this._backgroundColor.toString();

    this._backgroundColor = newColor;

    this._emit('propertyChange',
      new PropertyChangedEvent(
        this,
        'backgroundColor',
        old,
        newColor
      ));
  }

  get foreColor(): string {
    return this._foreColor;
  }

  set foreColor(newColor: string) {
    let old = this._foreColor.toString();

    this._foreColor = newColor;

    this._emit('propertyChange',
      new PropertyChangedEvent(
        this,
        'foreColor',
        old,
        newColor
      ));
  }

  /**
   * Height
   */
  get height(): any {
    return this._height;
  }

  set height(newHeight: any) {
    this._height = newHeight;

    this._emit('propertyChange',
      new PropertyChangedEvent(
        this,
        'width',
        null,
        newHeight
      ));


  }

  /**
   * Width
   */
  get width(): any {
    return this._width;
  }

  set width(newWidth: any) {
    this._width = newWidth;

    this._emit('propertyChange',
      new PropertyChangedEvent(
        this,
        'width',
        null,
        newWidth
      ));
  }

  /**
   * Rest
   */

  public getAbsoluteHeight() {
    return this.height;
  }

  public getAbsoluteWidth() {
    return this.height;
  }


  public get top(): number {
    return this.__position__.y;
  }

  public set top(v: number) {
    let old = v + 0;
    this.__position__.y = v;
    this._emit('propertyChange',
      new PropertyChangedEvent(
        this,
        'top',
        old,
        v
      ));
  }

  public get left(): number {
    return this.__position__.x;
  }

  public set left(v: number) {
    let old = v + 0;
    this.__position__.x = v;
    this._emit('propertyChange',
      new PropertyChangedEvent(
        this,
        'left',
        old,
        v
      ));
  }


  get position(): Point {
    return this.__position__;
  }

  set position(newPosition: Point) {
    let old = new Point(newPosition.x, newPosition.y);

    this.top = newPosition.y;
    this.left = newPosition.x;
    this.__position__ = newPosition;
    this._emit('propertyChange',
      new PropertyChangedEvent(
        this,
        'position',
        old,
        newPosition
      ));
  }

  public points(): Array<Point> {
    let p1 = new Point(this.position.x, this.position.y),
      p2 = new Point(this.position.x + this.getAbsoluteWidth(), this.position.y),
      p3 = new Point(this.position.x + this.getAbsoluteWidth(), this.position.y + this.getAbsoluteHeight()),
      p4 = new Point(this.position.x, this.position.y + this.getAbsoluteHeight());

    return [p1, p2, p3, p4];
  }

  get parent(): UIComponent {
    return this._parent;
  }

  public hasParent(): boolean {
    return ( isset(this.parent) && this.parent !== null);
  }

  public redraw() {
    // Do not redraw element if its not injected of force do
    if (!this.isInjected) return false;

    this.owner.registerElement(this);

    // Emit event
    this._emit('redraw', new UIEvent(this, {'force': false}));

    // Redraw self
    this.render();

    return true;
  }

  public _render() {
  }

  private _drawChildren() {
    this.controls.forEach(function _fnDrawChild(e) {
      e.redraw();
    });
  }

  public render() {
    this._drawn = false;
    this._emit('render', new UIEvent(this, null));
    this._render();
    this._drawChildren();
    this._drawn = true;
    this._emit('rendered', new UIEvent(this, null));
  }


  public __inject(parent: UIComponent) {
    this._parent = parent;
    this._injected = true;

    this._font.emittable = true;

    this.owner.registerElement(this);
    this._emit('inject', new UIEvent(this, {'parent': parent}));
    this.render();
  }

  public remove() {
    let parent = this.hasParent() ? this.parent : this.owner;
    parent.controls.remove(this);
  }

  public dispose() {
    this._emit('dispose', new UIEvent(this, null));
    this._injected = false;
  }

}
