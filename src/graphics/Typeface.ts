/**
 * The Typeface class specifies the typeface and intrinsic style of a font.
 * This is used in the paint, along with optionally Paint settings like textSize
 * to specify how text appears when drawn (and measured).
 */
export class Typeface {

  /**
   * List of font styles
   */
  static MONOSPACE: 'monospace';
  static SANS_SERIF: 'sans-serif';
  static SERIF: 'serif';

  /**
   * Create a new typeface
   * @param {string} fontFamily Font family name
   * @param {string} style Font style from Typeface.Style
   * @param {number} weight Font weight
   */
  constructor(
    public fontFamily: string = 'arial',
    public style: string = Typeface.SANS_SERIF,
    public weight: number = 400
    ) {}

  toString(fontSizePx: number = 13) {
    return `${this.weight} ${this.style} ${fontSizePx} ${this.weight}`;
  }
}
