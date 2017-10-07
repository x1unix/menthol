import {UIComponent} from '../ui';

export class Rectangle extends UIComponent {
  public _render() {
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
