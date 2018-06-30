import *as mat4 from './gl-matrix/mat4';
import {
    initShaderProgram,
    loadTexture,
} from './extension';
import {vsSource,fsSource} from './shader'
import {initBuffers} from './buffers';

if (canvas == null){
    console.log("global canvas is null please check");
}

let gl = canvas.getContext("webgl");

if (!gl){
    console.log("unable to initialize webgl");
}
gl.clearColor(0,0,0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const shaderProgram = initShaderProgram(gl,vsSource,fsSource);
const programInfo = {
    program:shaderProgram,
    attribLocations:{
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
        vertexNormal: gl.getAttribLocation(shaderProgram,"aVertexNormal"),
    },
    uniformLocations:{
        modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        projectionMatrix: gl.getUniformLocation(shaderProgram,"uProjectionMatrix"),
        uSampler: gl.getUniformLocation(shaderProgram,"uSampler"),
        normalMatrix: gl.getUniformLocation(shaderProgram,"uNormalMatrix"),
    }
};

const buffers = initBuffers(gl);
const texture = loadTexture(gl,"http://10.5.162.73:8082/firfox");

let then = 0;
let squareRotation = 0;

requestAnimationFrame(render);


function render(now) {
    now *= 0.001;
    const deltaTime = now - then;
    then = now;
    drawScene(gl,programInfo,buffers,texture,deltaTime);
    requestAnimationFrame(render)
}

function drawScene(gl, programInfo, buffers,texture,deltaTime) {
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = 45*Math.PI/180;
    const aspect = gl.canvas.clientWidth/gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100;
    const perspectiveMatrix = mat4.create();
    mat4.perspective(
        perspectiveMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar
    );
    const modelViewMatrix = mat4.create();
    mat4.translate(
        modelViewMatrix,  //destination matrix
        modelViewMatrix,  //matrix to translate
        [0.0,0.0,-6.0]
    );
    mat4.rotate(
        modelViewMatrix,
        modelViewMatrix,
        squareRotation,
        [0,1,1]
    );

    const normalMatrix = mat4.create();
    mat4.invert(normalMatrix,modelViewMatrix);
    mat4.transpose(normalMatrix,normalMatrix);

    //pull out positions from the position buffer into the vertexPosition Attribute
    {
        const numComponents = 3;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset
        );
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    }

    //pull out texture coordinates from texture coordinate buffer into the textureCoord attribute
    {
        const numComponents = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride =0;
        const offset =0;
        gl.bindBuffer(gl.ARRAY_BUFFER,buffers.textureCoord);
        gl.vertexAttribPointer(
            programInfo.attribLocations.textureCoord,
            numComponents,
            type,
            normalize,
            stride,
            offset
        );
        gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
    }

    //pull out normals from the normal buffer into the normalVertex attribute
    {
        const numComponents = 3;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER,buffers.normals);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexNormal,
            numComponents,
            type,
            normalize,
            stride,
            offset
        );
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
    }

    //tell webgl which indices to use to index the vertices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,buffers.indices);

    //tell opengl to use our program when drawing
    gl.useProgram(programInfo.program);

    //set shader uniforms
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        perspectiveMatrix
    );
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix
    );
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.normalMatrix,
        false,
        normalMatrix
    );

    //tell webgl we want to affect texture unit 0
    gl.activeTexture(gl.TEXTURE0);
    //bind texture to texture unit 0
    gl.bindTexture(gl.TEXTURE_2D,texture);
    //tell the shader we bind texture to texture unit 0
    gl.uniform1i(programInfo.uniformLocations.uSampler,0);

    {
        const offset = 0;
        const vertexCount = 36;
        const type = gl.UNSIGNED_SHORT;
        gl.drawElements(gl.TRIANGLES,vertexCount,type,offset);
    }

    squareRotation += deltaTime;
}