import {
    PlaneBufferGeometry,
    MeshLambertMaterial,
    Mesh,
}from '../libs/three';

const planeGeometry = new PlaneBufferGeometry(100,100,10,10);
const planeMaterial = new MeshLambertMaterial({color:"#ffffff"});
const plane = new Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

export default plane;