export const vsSource = `
        attribute vec4 aVertexPosition;
        attribute vec3 aVertexNormal;
        attribute vec2 aTextureCoord;
        
        uniform mat4 uNormalMatrix;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        
        varying vec2 vTextureCoord;
        varying vec3 vLighting;

        void main(){
            gl_Position = uProjectionMatrix*uModelViewMatrix*aVertexPosition;
            vTextureCoord = aTextureCoord;
            
            //Applying lighting
            
            vec3 ambientLight = vec3(0.3,0.3,0.3);
            vec3 directionalColor = vec3(1,1,1);
            vec3 directionalVector = normalize(vec3(0.85,0.8,0.75));
            
            vec4 transformedNormal = uNormalMatrix* vec4(aVertexNormal,1.0);
            float directional = max(dot(transformedNormal.xyz,directionalVector),0.0);
            
            vLighting = ambientLight + (directionalColor * directional);
        }
    `;


export const fsSource = `
        precision mediump float;
        varying vec2 vTextureCoord;
        varying vec3 vLighting;
        
        uniform sampler2D uSampler;
        
        void main(){
            vec4 textureColor = texture2D(uSampler, vTextureCoord);
            gl_FragColor = vec4(textureColor.rgb * vLighting, textureColor.a);
        }
    `;