import {Storyboard} from '../../src/ui/Storyboard';
import {Label} from '../../src/components/Label';
import {Rectangle} from '../../src/components/Rectangle';
import {Button} from '../../src/components/Button';

/**
 * Application storyboard class
 */
export class ApplicationStoryboard extends Storyboard {
  public times = 0;
  public loop = false;
  public redrawTimes = 0;
  public fps = 0;
  public interval: number = null;

  public onCreate() {
    super.onCreate();

    // Add global event listener
    this.on('click',  () => {
      console.log('canvas form click!');
    });

    // Update frames count on each redraw
    this.on('redraw', () => {
      this.redrawTimes++;
    });

    // Label
    let label = new Label(this);
    label.left = 320;
    label.top = 128;
    label.text = `Redraw requests: ${this.redrawTimes}\nFPS: ${this.fps}`;
    label.foreColor = '#ff00aa';
    label.font.size = 18;
    this.controls.add(label);


    // Rectangle
    let rect = new Rectangle(this);
    rect.height = 32;
    rect.width = 32;
    rect.left = 0;
    rect.top = 0;
    rect.backgroundColor = 'red';
    rect.on('click', () => {
      alert('rect click');
    });

      // Add item to view
    this.controls.add(rect);


      // Button
    let button = new Button(this);
    button.left = 128;
    button.top = 128;
    button.text = 'Click on start count!';
    button.font.size = 12;
    button.foreColor = '#fff';


    function doCount() {
      if (!stopped) {
        this.times++;
        button.text = `Counting... ${this.times}`;

        button.backgroundColor = t ? '#f00' : '#00f';
        t = !t;

        window.requestAnimationFrame(doCount);
      } else {
        this.times = 0;
        button.text = 'Click on start count!';
      }
    }

    let t = false;
    let stopped = true;


    button.on('click', () => {
      stopped = !stopped;
      if (!stopped) doCount();
    });

    button.on('mouseover', (event) => {
      button.backgroundColor = '#cecece';
      button.foreColor = '#000';
    });

    button.on('mouseout', () => {
      button.backgroundColor = '#000';
      button.foreColor = '#fff';
    });


    this.controls.add(button);


    // FPS Benchmark
    // Update fps on label
    this.interval = setInterval(() => {
      label.text = `Redraw requests: ${this.redrawTimes}\nFPS: ${this.fps}`;
      this.fps = 0;
      this.redrawTimes = 0;
    }, 1000);


    window.requestAnimationFrame(() => this.fpsCount);
  }

  /**
   * On Storyboard destroy hook
   */
  onDestroy() {
    super.onDestroy();

    // Clear interval
    clearInterval(this.interval);
  }

  /**
   * Count frame rate
   */
  fpsCount() {
    this.fps++;
    window.requestAnimationFrame(() => this.fpsCount);
  }
}
