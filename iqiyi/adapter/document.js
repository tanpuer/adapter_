import Canvas from './Canvas';
import Image from './Image';
import HTMLElement from './HTMLElement'

class Document extends HTMLElement{

    constructor(){
        super();
    }

    createElement(tagName){
        if (tagName === "canvas"){
            return new Canvas();
        } else if (tagName === "img") {
            return new Image();
        }
        return null;
    }

    createElementNS(namespaceURI, qualifiedName, options={}){
        return this.createElement(qualifiedName);
    }
}

const document = new Document();
export default document;

