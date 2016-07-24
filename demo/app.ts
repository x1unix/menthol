// In this example we use local libraries from starter kit.
// If you're using npm, import from 'kratos/ui'

import {Form} from '../ui';
import {Button, Label, Rectangle} from '../components';

let times = 0;
let loop = false;

// Create main frame
var app = new Form( document.getElementById('app'), function() {
    this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    console.log('call bootstrap',this);
} );

// Add global event listener
app.on('click', function() {
    console.log('canvas form click!');
});

// Rectangle
var rect = new Rectangle(app);
rect.height = 32
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
var button = new Button(app);
button.left = 128;
button.top = 128;
button.text = "Click on start count!";
button.font.size = 12;
button.foreColor = '#fff';



function doCount() {
    times++;
    button.text = `Counting... ${times}`;
    if( !stopped ) {
        stopped = false;
        window.requestAnimationFrame(doCount);
    }
}

function breakCount() {
    stopped = true;
    times = 0;
    button.text = "Click on start count!";
}

var btnClicked = false;
var stopped = false;


button.on('click', () => {
    btnClicked ? breakCount() : doCount();
    btnClicked = !btnClicked;
});

button.on('mouseover', function(event) {
    button.backgroundColor = "#cecece";
    button.foreColor = "#000";
});

button.on('mouseout', () => {
    button.backgroundColor = "#000";
    button.foreColor = "#fff";
} );


app.controls.add(button);


// Label
var label = new Label(app);
label.left = 320;
label.top = 128;
label.text = "Hello world!";
label.foreColor = "#ff00aa";
label.font.size = 18;
app.controls.add(label);


window['app'] = app;