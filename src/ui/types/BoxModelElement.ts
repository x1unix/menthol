import {Emittable} from '../../events';

export class BoxModelElement extends Emittable {
  private _top: number;
  private _right: number;
  private _bottom: number;
  private _left: number;


  public get top(): number {
    return this._top;
  }

  public set top(value: number) {
    this._top = value;
    this._onChange('top');
  }

  public get right(): number {
    return this._right;
  }

  public set right(value: number) {
    this._right = value;
    this._onChange('right');
  }

  public get bottom(): number {
    return this._bottom;
  }

  public set bottom(value: number) {
    this._bottom = value;
    this._onChange('bottom');
  }

  public get left(): number {
    return this._left;
  }

  public set left(value: number) {
    this._left = value;
    this._onChange('left');
  }

  public constructor(top: number = 0, right: number = 0, bottom: number = 0, left: number = 0) {
    super();
    this._top = top;
    this._left = left;
    this._right = right;
    this._bottom = bottom;
  }
}
