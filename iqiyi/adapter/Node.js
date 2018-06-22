import EventTarget from './EventTarget';

export default class Node extends EventTarget{

    constructor(){
        super();
        this.childNodes = [];
    }

    appendChild(node){
        if (node instanceof Node){
            this.childNodes.push(node);
        }
    }

    cloneNode() {
        const copyNode = Object.create(this);
        Object.assign(copyNode, this);
        return copyNode;
    }

    removeChild(node) {
        const index = this.childNodes.findIndex((child) => child === node);
        if (index > -1) {
            return this.childNodes.splice(index, 1);
        }
        return null
    }

}