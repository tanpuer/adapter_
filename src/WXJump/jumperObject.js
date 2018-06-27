import {
    Object3D,
    CylinderGeometry,
    MeshPhongMaterial,
    SphereGeometry,
    Mesh,
}from '../libs/three';

//圆-圆-圆柱体
const jumperObject = new Object3D();

let cylinderGeometry = new CylinderGeometry(0.1, 0.2, 0.5);
let cylinderMaterial = new MeshPhongMaterial({ color: "#00008B" });
let cylinder = new Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(0, 0, 0.75);
cylinder.rotation.x = Math.PI / 2;
cylinder.castShadow = true;
jumperObject.add(cylinder);

let topSphereGeometry = new SphereGeometry(0.15,10);
let topSphereMaterial = new MeshPhongMaterial({ color: "#00008B" });
let topSphere = new Mesh(topSphereGeometry, topSphereMaterial);
topSphere.position.set(0, 0, 1.45);
topSphere.castShadow = true;
jumperObject.add(topSphere);

let middleSphereGeometry = new SphereGeometry(0.15,10);
let middleSphereMaterial = new MeshPhongMaterial({ color: "#00008B" });
let middleSphere = new Mesh(middleSphereGeometry, middleSphereMaterial);
middleSphere.position.set(0, 0, 1.1);
middleSphere.castShadow = true;
jumperObject.add(middleSphere);
jumperObject.castShadow = true;

export default jumperObject;