// In this example we use local libraries from starter kit.
// If you're using npm, import from 'kratos/ui'

import { Storyboard } from '../../src/ui';
import {Button, Label, Rectangle} from '../../src/components';

let times = 0;
let loop = false;
let redrawTimes = 0;
let fps = 0;


// Create main frame
let app = new Storyboard( document.getElementById('app'), function() {
    this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    console.log('call bootstrap', this);
} );

// Add global event listener
app.on('click', function() {
    console.log('canvas form click!');
});

// Update frames count on each redraw
app.on('redraw', () => {
    redrawTimes++;
});

// Label
let label = new Label(app);
label.left = 320;
label.top = 128;
label.text = `Redraw requests: ${redrawTimes}\nFPS: ${fps}`;
label.foreColor = '#ff00aa';
label.font.size = 18;
app.controls.add(label);


// Rectangle
let rect = new Rectangle(app);
rect.height = 32;
rect.width = 32;
rect.left = 0;
rect.top = 0;
rect.backgroundColor = 'red';
rect.on('click', function() {
     alert('rect click');
});

// Add item to application
app.controls.add(rect);


// Button
let button = new Button(app);
button.left = 128;
button.top = 128;
button.text = 'Click on start count!';
button.font.size = 12;
button.foreColor = '#fff';



function doCount() {
    if (!stopped ) {
        times++;
        button.text = `Counting... ${times}`;

        button.backgroundColor = t ? '#f00' : '#00f';
        t = !t;

        window.requestAnimationFrame(doCount);
    } else {
        times = 0;
        button.text = 'Click on start count!';
    }
}

let t = false;
let stopped = true;


button.on('click', () => {
    stopped = !stopped;
    if (!stopped) doCount();
});

button.on('mouseover', function(event) {
    button.backgroundColor = '#cecece';
    button.foreColor = '#000';
});

button.on('mouseout', () => {
    button.backgroundColor = '#000';
    button.foreColor = '#fff';
} );


app.controls.add(button);


// FPS Benchmark
// Update fps on label
setInterval(() => {
    label.text = `Redraw requests: ${redrawTimes}\nFPS: ${fps}`;
    fps = 0;
    redrawTimes = 0;
}, 1000);

// Count fps
function fpsCount() {
    fps++;
    window.requestAnimationFrame(fpsCount);
}

window.requestAnimationFrame(fpsCount);


window['app'] = app;
