import {
    DirectionalLight
} from '../libs/three';

const shadowLight = new DirectionalLight("#ffffff", 1);
shadowLight.castShadow = true;
shadowLight.position.set(200, 0, 200);
shadowLight.shadow.left = -100;
shadowLight.shadow.right = 100;
shadowLight.shadow.top = 100;
shadowLight.shadow.bottom = -100;
// shadowLight.shadow.camera.near = 0.1;
// shadowLight.shadow.camera.far = 100;
shadowLight.shadow.mapSize.width = 1024;
shadowLight.shadow.mapSize.height = 1024;


export default shadowLight;