export class FontStyle {
  private _styleType: string;

  public constructor(type: string) {
    this._styleType = type;
  }

  public toString() {
    return this._styleType.toString();
  }

  public static normal: FontStyle = new FontStyle('normal');
  public static italic: FontStyle = new FontStyle('italic');
}
