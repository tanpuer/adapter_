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

// Because images have to be download over the internet
// they might take a moment until they are ready.
// Until then put a single pixel in the texture so we can
// use it immediately. When the image has finished downloading
// we'll update the texture with the contents of the image.
export function loadTexture(gl,url) {
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D,texture);
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0,0,255,255]);
    gl.texImage2D(gl.TEXTURE_2D,level,internalFormat,width,height,border,srcFormat,srcType,pixel);

    const image = new Image();
    image.onload = function () {
        //成为当前操作纹理
        gl.bindTexture(gl.TEXTURE_2D,texture);
        //把已经加载的图片图形数据写到纹理
        gl.texImage2D(gl.TEXTURE_2D,level,internalFormat,srcFormat,srcType,image);
        //WebGL1 has different requirements for power of 2 images
        // vs non power of 2 images so check if the image is a
        // power of 2 in both dimensions.
        if (isPowerOf2(image.width) && isPowerOf2(image.height)){
            //生成多级渐进纹理
            gl.generateMipmap(gl.TEXTURE_2D);
        }else {
            //纹理过滤器
            gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
        }
    };
    image.src = url;
    return texture;
}

function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}