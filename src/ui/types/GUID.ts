export class GUID {
  public static generate(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  public toString(): string {
    return '';
  }

  public length(): number {
    return this.toString().length;
  }

  public constructor() {
    const value: string = GUID.generate();
    this.toString = () => value;
  }
}
