import {View} from '../view/View';
import {MTEventEmitter} from '../foundation/MTEventEmitter';
import {TextChangedEvent} from './TextChangedEvent';
import {Storyboard} from '../ui/Storyboard';
import {ViewGroup} from '../view/ViewGroup';
import {MTColor} from '../foundation/MTColor';
import {Typeface} from '../graphics/Typeface';
import {Gravity} from '../view/Gravity';
import {MTSquare} from '../foundation/MTSquare';
import {MTPoint} from '../foundation/MTPoint';
import {isNil} from 'lodash';
import {Fonts} from '../graphics/Fonts';

/**
 * A user interface element that displays text to the user.
 */
export class TextView extends View {
  /**
   * Text content
   * @type {string}
   */
  protected text: string = 'TextView';

  /**
   * Text size (in pixels)
   * @type {number}
   */
  protected textSize: number = 13;


  /**
   * Text typeface
   * @type {Typeface}
   */
  protected typeface: Typeface = Fonts.SANS_SERIF;

  /**
   * Line count
   * @type {number}
   */
  protected lineCount: number = 1;

  /**
   * Line height
   * @type {number}
   */
  protected lineHeight: number = 1.2;

  /**
   * Text color
   * @type {MTColor}
   */
  protected textColor: MTColor = new MTColor(0, 0, 0);

  /**
   * View's max height
   * @type {number}
   */
  protected maxHeight: number = 0;

  /**
   * View's max width
   * @type {number}
   */
  protected maxWidth: number = null;

  /**
   * View's min width
   * @type {number}
   */
  protected minWidth: number = 0;

  /**
   * View's min height
   * @type {number}
   */
  protected minHeight: number = 0;

  protected contentSize: MTPoint = new MTPoint();

  public textChanged: MTEventEmitter<TextChangedEvent> = null;

  onViewPreConfigure() {
    super.onViewPreConfigure();

    // Configure events
    this.textChanged = new MTEventEmitter<TextChangedEvent>(this);
  }

  /**
   * Set text content of the TextView
   * @param {string} text Text
   * @returns {TextView}
   */
  public setText(text: string): TextView {
    this.text = text;
    this.updateLayout();
    return this;
  }

  /**
   * Gets text content of the TextView
   * @returns {string}
   */
  public getText(): string {
    return this.text;
  }

  /**
   * Set text color
   * @param {MTColor} color color
   * @returns {TextView}
   */
  public setTextColor(color: MTColor): TextView {
    this.textColor = color;
    return this;
  }

  /**
   * Gets text color
   * @returns {MTColor}
   */
  public getTextColor(): MTColor {
    return this.textColor;
  }

  /**
   * Return the number of lines of text, or 0 if the internal Layout has not been built.
   * @returns {number}
   */
  public getLineCount(): number {
    return this.lineCount;
  }

  /**
   * Gets the vertical distance between lines of text, in pixels.
   * @returns {number}
   */
  public getLineHeight(): number {
    return this.lineHeight;
  }


  /**
   * Sets line height (in pixel)
   * @param {number} newSize
   * @returns {TextView}
   */
  public setLineHeight(newSize: number): TextView {
    this.lineHeight = newSize;
    this.updateLayout();
    return this;
  }


  public getMaxWidth(): number {
    return this.maxWidth;
  }

  public setMaxWidth(newWidth: number): TextView {
    this.maxWidth = newWidth;
    this.updateLayout();
    return this;
  }

  public getMinWidth(): number {
    return this.maxWidth;
  }

  public setMinWidth(newWidth: number): TextView {
    this.minWidth = newWidth;
    this.updateLayout();
    return this;
  }

  public getMaxHeight(): number {
    return this.maxHeight;
  }

  public setMaxHeight(newHeight: number): TextView {
    this.maxHeight = newHeight;
    this.updateLayout();
    return this;
  }

  public getMinHeight(): number {
    return this.maxHeight;
  }

  public setMinHeight(newHeight: number): TextView {
    this.minHeight = newHeight;
    this.updateLayout();
    return this;
  }

  /**
   * Gets text size (in pixel)
   * @returns {number}
   */
  public getTextSize(): number {
    return this.textSize;
  }

  /**
   * Sets text size (in pixel)
   * @param {number} newSize
   * @returns {TextView}
   */
  public setTextSize(newSize: number): TextView {
    this.textSize = newSize;
    this.updateLayout();
    return this;
  }

  /**
   * Sets the typeface and style in which the text should be displayed.
   * @param {Typeface} typeface
   * @returns {TextView}
   */
  public setTypeface(typeface: Typeface): TextView {
    this.typeface = typeface;
    this.updateLayout();
    return this;
  }

  /**
   * Gets the current Typeface that is used to style the text.
   * @returns {Typeface}
   */
  public getTypeface(): Typeface {
    return this.typeface;
  }

  protected getTextAlignment(): string {
    switch (this.gravity) {
      case Gravity.CENTER:
        return 'center';
      case Gravity.CENTER_HORIZONTAL:
        return 'center';
      case Gravity.RIGHT:
        return 'right';
      case Gravity.LEFT:
        return 'left';
      case Gravity.START:
        return 'start';
      case Gravity.END:
        return 'end';
      default:
        return 'left';
    }
  }

  public getContentSize(): MTPoint {
    return this.contentSize;
  }

  /**
   * @override
   * @param {boolean} changed
   * @param {MTSquare} drawArea
   */
  public onLayout(changed: boolean, drawArea: MTSquare) {
    const canvas = this.context.getRenderingContext();
    canvas.textAlign = this.getTextAlignment();
    canvas.font = this.typeface.toString(this.textSize);

    this.contentSize = new MTPoint(
      canvas.measureText(this.text).width,
      this.textSize * this.lineHeight
    );

    super.onLayout(changed, drawArea);
  }


  public onDraw(area: MTSquare, canvas: CanvasRenderingContext2D) {
    super.onDraw(area, canvas);

    canvas.textAlign = this.getTextAlignment();
    canvas.font = this.typeface.toString(this.textSize);
    canvas.fillStyle = this.textColor.toString();

    if (!isNil(this.maxWidth)) {
      this.maxWidth = area.width;
    }

    const position = this.getContentDrawPosition(area, this.getContentSize());

    canvas.fillText(this.text, position.x, position.y, this.maxWidth);
  }



}
