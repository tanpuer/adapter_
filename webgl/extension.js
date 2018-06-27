export function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader,source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
        console.log("gl.compileShader error: ", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

export function initShaderProgram(gl,vsSource,fsSource) {
    const vertexShader = loadShader(gl,gl.VERTEX_SHADER,vsSource);
    const fragmentShader = loadShader(gl,gl.FRAGMENT_SHADER,fsSource);
    const program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program,gl.LINK_STATUS)){
        console.log("gl.linkProgram error: ", gl.getProgramInfoLog(program));
        return null;
    }
    return program;
}