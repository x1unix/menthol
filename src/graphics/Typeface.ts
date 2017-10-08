/**
 * The Typeface class specifies the typeface and intrinsic style of a font.
 * This is used in the paint, along with optionally Paint settings like textSize
 * to specify how text appears when drawn (and measured).
 */
export class Typeface {

  /**
   * List of font styles
   */
  static Style: {
    MONOSPACE: 'monospace',
    SANS_SERIF: 'sans-serif',
    SERIF: 'serif'
  };


  /**
   * Default serif typeface
   * @type {Typeface}
   */
  static SERIF = new Typeface('Times New Roman, Times, serif', Typeface.Style.SERIF, 400);

  /**
   * Default sans-serif typeface
   * @type {Typeface}
   */
  static SANS_SERIF = new Typeface('Arial, Helvetica, sans-serif', Typeface.Style.SANS_SERIF, 400);

  /**
   * Default monospace font
   * @type {Typeface}
   */
  static MONOSPACE = new Typeface('Lucida Console, Monaco, monospace', Typeface.Style.MONOSPACE, 400);

  /**
   * Create a new typeface
   * @param {string} fontFamily Font family name
   * @param {string} style Font style from Typeface.Style
   * @param {number} weight Font weight
   */
  constructor(
    public fontFamily: string = 'arial',
    public style: string = Typeface.Style.SANS_SERIF,
    public weight: number = 400
    ) {}

  toString(fontSizePx: number = 13) {
    return `${this.weight} ${this.style} ${fontSizePx} ${this.weight}`;
  }
}
