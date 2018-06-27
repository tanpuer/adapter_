import *as mat4 from './gl-matrix/mat4';
import {
    initShaderProgram,
} from './extension';

const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
if (!gl){
    console.log("unable to initialize webgl");
}
gl.clearColor(0,0,0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const vsSource = `
        attribute vec4 aVertexPosition;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        void main(){
            gl_Position = uProjectionMatrix*uModelViewMatrix*aVertexPosition;
        }
    `;
const fsSource = `

        void main(){
            gl_FragColor = vec4(1.0,1.0,1.0,1.0);
        }
    `;

const shaderProgram = initShaderProgram(gl,vsSource,fsSource);
const programInfo = {
    program:shaderProgram,
    attribLocations:{
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
    },
    uniformLocations:{
        modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        projectionMatrix: gl.getUniformLocation(shaderProgram,"uProjectionMatrix"),
    }
};

const buffers = initBuffers(gl);
drawScene(gl,programInfo,buffers);


function initBuffers(gl) {
    //得到缓冲对象并保存在缓冲顶点器
    const positionBuffer = gl.createBuffer();
    //绑定上下文
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    let vertices = [
        1.0,1.0,0,
        -1.0,1.0,0,
        -1.0,-1.0,0,
        1.0,-1.0,0
    ];
    //pass the list of positions to webgl to build the shape
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
    return{
        position:positionBuffer
    };
}

function drawScene(gl, programInfo, buffers) {
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

    {
        const offset = 0;
        const vertexCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP,offset,vertexCount);
    }

}