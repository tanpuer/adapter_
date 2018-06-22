import Node from './Node';

export default class Element extends Node {


    constructor() {
        super();
        this.className = '';
        this.children = [];
    }
}
