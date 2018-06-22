import HTMLElement from './HTMLElement';
import _window from './window';


export default function Canvas(width,height) {
    const canvas = Cube.createCanvas(width,height);
    canvas.type = "canvas";
    canvas.__proto__.__proto__ = new HTMLElement('canvas');
    return canvas;
}