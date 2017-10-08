export class MTBox {
  constructor(
    public top = 0,
    public right = 0,
    public bottom = 0,
    public left = 0
  ) {}

  /**
   * Create MTBox from array
   * @param {number[]} arr
   * @returns {MTBox}
   */
  static fromArray(arr: number[]) {
    return new MTBox(arr[0], arr[1], arr[2], arr[3]);
  }
}
