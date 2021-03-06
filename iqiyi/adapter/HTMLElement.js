import Element from './Element'

const canvas = Cube.obtainWindowCanvas();
const gl = canvas.getContext('webgl');
const innerWidth = gl.canvas.width;
const innerHeight = gl.canvas.height;

export default class HTMLElement extends Element {

    constructor(tagName = '') {
        super();
        this.tagName = tagName.toUpperCase();
        this.className= '';
        this.childern= [];
        this.style={
            width: `${innerWidth}px`,
            height: `${innerHeight}px`
        };
        this.innerHTML = '';
    }

    setAttribute(name, value) {
        this[name] = value;
    }

    getAttribute(name) {
        return this[name];
    }

    get clientWidth() {
        return innerWidth;
    }

    get clientHeight() {
        return innerHeight;
    }

    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: innerWidth,
            height: innerHeight
        }
    }

    focus() {

    }
}
