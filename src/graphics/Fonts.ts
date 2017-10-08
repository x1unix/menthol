import {Typeface} from './Typeface';

export class Fonts {
  static SERIF = new Typeface('Times New Roman, Times, serif', Typeface.SERIF, 400);

  /**
   * Default sans-serif typeface
   * @type {Typeface}
   */
  static SANS_SERIF = new Typeface('Arial, Helvetica, sans-serif', Typeface.SANS_SERIF, 400);

  /**
   * Default monospace font
   * @type {Typeface}
   */
  static MONOSPACE = new Typeface('Lucida Console, Monaco, monospace', Typeface.MONOSPACE, 400);
}
