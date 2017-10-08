/// Application example with menthol
import { TestStoryboard } from './test.storyboard';
import {Menthol} from '../../src/Menthol';

// Get Canvas from DOM
const canvas = <HTMLCanvasElement> document.querySelector('canvas#storyboard');

// Bootstrap application using storyboard
Menthol.bootstrapView(canvas, TestStoryboard);
