import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    SphereGeometry,
    TextureLoader,
    MeshBasicMaterial,
    Mesh,
    ArrowHelper,
    Vector3,
    AmbientLight,
    CubeGeometry,
} from './libs/three';

export default class MeshDemo {

    constructor() {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
        const ctx = canvas.getContext('webgl', { antialias: true });
        this.renderer = new WebGLRenderer({ canvas: canvas, context: ctx });
        this.renderer.setClearColor("#ffffff");
        this.camera.position.z = 5;
        this.renderer.setSize(innerWidth,innerHeight);

        this.addLight();
        this.drawSphere();
        this.addMeshFacialMaterial();
        this.renderer.render(this.scene, this.camera);
    }

    drawSphere() {
        let geometry = new SphereGeometry(0.6, 32, 32);
        let loader = new TextureLoader();
        loader.setCrossOrigin("");
        loader.load("http://10.5.162.73:8082/moonmap",(texture)=>{
            console.log("loader load callback");
            console.log(texture.image != null);
            let material = new MeshBasicMaterial({map:texture});
            this.sphere = new Mesh(geometry, material);
            this.scene.add(this.sphere);
            this.renderer.render(this.scene, this.camera);
            this.addArrowOnSphere();
            requestAnimationFrame(() => this.loop());
        });
        // let texture = new THREE.TextureLoader().load("http://10.5.162.73:8082/moonmap");
    }

    addArrowOnSphere() {
        const facesLength = this.sphere.geometry.faces.length;
        for (let i = 0; i < facesLength; i += 10) {
            let face = this.sphere.geometry.faces[i];
            let arrow = new ArrowHelper(face.normal, new Vector3(0, 0, 0), 1.2, "#ff0000");
            this.sphere.add(arrow);
        }
    }

    addLight() {
        let ambientLight = new AmbientLight("#ffffff");
        this.scene.add(ambientLight);
    }

    loop() {
        this.renderer.render(this.scene, this.camera);
        this.sphere.rotation.y += 0.02;
        this.group.rotation.y += 0.02;
        requestAnimationFrame(() => this.loop());
    }

    addMeshFacialMaterial() {
        let group = new Mesh();
        this.group = group;
        const size = 0.29;
        let facialMaterial = [
            new MeshBasicMaterial({ color: 0x009e60 }),
            new MeshBasicMaterial({ color: 0x0051ba }),
            new MeshBasicMaterial({ color: 0xffd500 }),
            new MeshBasicMaterial({ color: 0xC41E3A }),
            new MeshBasicMaterial({ color: 0xff5800 }),
            new MeshBasicMaterial({ color: 0xffffff })
        ];
        for (let x = -3; x < 3; x++) {
            for (let y = -1.5; y < 3; y++) {
                for (let z = -1.5; z < 3; z++) {
                    let cubeGeometry = new CubeGeometry(size, size, size);
                    let cube = new Mesh(cubeGeometry, facialMaterial);
                    group.add(cube);
                    cube.position.set(x, y, z)
                }
            }
        }
        this.scene.add(group);
    }

}