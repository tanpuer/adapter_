import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
} from '../libs/three';
import plane from './plane';
import shadowLight from './shadowLight';
import ambientLight from './ambientLight';
import jumperObject from './jumperObject';
import *as THREE from '../libs/three';
import '../libs/OrbitControls';

let scene;
let camera;
let renderer;
let jumper;
let _this;


export default class wxJump {

    constructor(){
        scene = new Scene();
        camera = new PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
        const ctx = canvas.getContext('webgl',{antialias:true});
        renderer = new WebGLRenderer({canvas:canvas, context:ctx});
        renderer.setClearColor("#ffffff");
        renderer.setSize(innerWidth,innerHeight);
        renderer.shadowMap.enabled = true;
        camera.position.x = 0;
        camera.position.y = -7;
        camera.position.z = 5;

        this.plane = plane;
        scene.add(this.plane);
        this.shadowLight = shadowLight;
        scene.add(this.shadowLight);
        this.ambientLight = ambientLight;
        scene.add(this.ambientLight);
        jumper = jumperObject;
        scene.add(jumperObject);

        _this = this;
        new THREE.OrbitControls(camera);
        this.addEventListeners();
        this.loop();

    }

    loop(){
        renderer.render(scene,camera);
        requestAnimationFrame(()=>this.loop());
    }

    addEventListeners(){
        canvas.addEventListener("touchStart", this.onTouchStart, false);
        canvas.addEventListener("touchEnd", this.onTouchEnd, false);
    }

    onTouchStart(data){
        console.log(jumper.children);
    }

    onTouchEnd(data){

    }

}