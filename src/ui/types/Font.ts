import {isset} from '../../helpers';
import {FontStyle} from './FontStyle';
import {EventEmitter, PropertyChangedEvent} from '../../events';

export class Font extends EventEmitter {

  public emittable: boolean = false;

  private _onChange(prop: string) {
    if (this.emittable) {
      this._emit('propertyChange', new PropertyChangedEvent(this, prop, null, null));
    }
  }

  private _height: number;

  public get height(): number {
    return ( !isset(this._height) || typeof this._height == 'undefined' ) ? (this._size * 1.2) | 0 : this._height;
  }

  public set height(value: number) {
    this._height = value;
    this._onChange('height');
  }


  private _weight: number;
  public get weight(): number {
    return this._weight;
  }

  public set weight(value: number) {
    this._weight = value;
    this._onChange('weight');
  }


  private _style: FontStyle;
  public get style(): FontStyle {
    return this._style;
  }

  public set style(v: FontStyle) {
    this._style = v;
    this._onChange('style');
  }


  private _family: string;
  public get family(): string {
    return this._family;
  }

  public set family(v: string) {
    this._family = v;
    this._onChange('family');
  }


  private _size: number;
  public get size(): number {
    return this._size;
  }

  public set size(v: number) {
    this._size = v;
    this._onChange('size');
  }

  public toString(): string {
    return [this.style.toString(), this.weight, this.size + 'px/' + this.height + 'px', this.family].join(' ');
  }

  public constructor(family: string = 'sans-serif', size: number = 10, weight: number = 400) {
    super();
    this._family = family;
    this._size = size;
    this._weight = weight;
    this._style = FontStyle.normal;
  }

}
