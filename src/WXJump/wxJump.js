import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
} from '../libs/three';
import plane from './plane';
import shadowLight from './shadowLight';
import ambientLight from './ambientLight';

let scene;
let camera;
let renderer;


export default class wxJump {

    constructor(){
        scene = new Scene();
        camera = new PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
        const ctx = canvas.getContent('webgl',{antialias:true});
        renderer = new WebGLRenderer({canvas:canvas, context:ctx});
        renderer.setClearColor("#ffffff");
        renderer.setSize(innerWidth,innerHeight);
        renderer.shadowMap.enabled = true;
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 5;

        this.plane = plane;
        scene.add(this.plane);
        this.shadowLight = shadowLight;
        scene.add(this.shadowLight);
        this.ambientLight = ambientLight;
        scene.add(this.ambientLight);

    }

    loop(){

    }

}