export class MTObject {
  /**
   * Get object class name
   * @returns {string}
   */
  public get className(): string {
    const constructorName = this.constructor['name'];
    if ((constructorName === null) || typeof constructorName === 'undefined') {
      return Object.prototype.toString.call(this)
        .match(/^\[object\s(.*)\]$/)[1];
    } else {
      return constructorName;
    }
  }
}
