import Canvas from "./Canvas";
import document from './document';
import navigator from './navigator';
import HTMLElement from './HTMLElement'


//暴露全局canvas
const canvas = Cube.obtainWindowCanvas();
canvas.__proto__.__proto__ = new HTMLElement('canvas');

const gl = canvas.getContext('webgl');
const innerWidth = gl.canvas.width;
const innerHeight = gl.canvas.height;

canvas.addEventListener = function(){};
gl.getExtension = function(){};


const _window = {
    canvas: canvas,
    gl:gl,
    innerWidth:innerWidth,
    innerHeight:innerHeight,
    document:document,
    navigator:navigator,
    addEventListener:()=>{},
};

export default _window;

