/// Application example with menthol
import { ApplicationStoryboard } from './application.storyboard';
import {Menthol} from '../../src/Menthol';

// Get Canvas from DOM
const canvas = <HTMLCanvasElement> document.querySelector('canvas#storyboard');

// Bootstrap application using storyboard
Menthol.bootstrapView(canvas, ApplicationStoryboard);
