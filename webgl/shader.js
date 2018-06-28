export const vsSource = `
        attribute vec4 aVertexPosition;
        attribute vec3 aVertexNormal;
        attribute vec2 aTextureCoord;
        
        uniform mat4 uNormalMatrix;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        
        varying highp vec2 vTextureCoord;
        varying highp vec3 vLighting;

        void main(){
            gl_Position = uProjectionMatrix*uModelViewMatrix*aVertexPosition;
            vTextureCoord = aTextureCoord;
            
            //Applying lighting
        }
    `;


export const fsSource = `
        varying highp vec2 vTextureCoord;
        
        uniform sampler2D uSampler;
        
        void main(){
            gl_FragColor = texture2D(uSampler,vTextureCoord);
        }
    `;