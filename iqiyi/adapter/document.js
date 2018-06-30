import Canvas from './Canvas';
import image from './image';
import HTMLElement from './HTMLElement'

class Document extends HTMLElement{

    constructor(){
        super();
    }

    createElement(tagName){
        console.log("createElement: " + tagName);
        if (tagName === "canvas"){
            return Canvas();
        } else if (tagName === "img") {
            return new image();
        }
        return new HTMLElement(tagName);
    }

    createElementNS(namespaceURI, qualifiedName, options={}){
        return this.createElement(qualifiedName);
    }
}

const document = new Document();
export default document;

