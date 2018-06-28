import './libs/laya.core';
import './libs/laya.webgl';
import './libs/laya.ani';
import './libs/laya.filter';
import './libs/laya.html';
import './libs/laya.particle';
import './libs/laya.tiledmap';
import './libs/laya.ui';
import './libs/laya.d3';

export default class LayaCube{

    constructor(){
        //初始化引擎
        Laya3D.init(0,0,true);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        var scene = Laya.stage.addChild(new Laya.Scene());
        var camera = (scene.addChild(new Laya.Camera(0,0.1,100)));
        camera.transform.translate(new Laya.Vector3(0,2,3));
        camera.transform.rotate(new Laya.Vector3(-30,0,0),true,false);
        camera.clearColor = null;

        var directionLight = scene.addChild(new Laya.DirectionLight());
        directionLight.ambientColor = new Laya.Vector3(0.6,0.6,0.6);
        directionLight.specularColor = new Laya.Vector3(0.6,0.6,0.6);
        directionLight.diffuseColor = new Laya.Vector3(1.6,1.6,1.6);
        directionLight.direction = new Laya.Vector3(0.3,-1,0);

        this.box = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1,1,1)));
// box.transform.rotate(new Laya.Vector3(0,45,0),false,false);
        var material = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("http://localhost:8082/layaboxpng");
        this.box.meshRender.material = material;

        Laya.timer.once(4000,this,onLoop);

        function onLoop(){

        }
    }
}