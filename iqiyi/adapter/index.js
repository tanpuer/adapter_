import _window from './window';



console.log("inject!!!");
let windowKeys = Object.keys(_window);
for (let i=0;i<windowKeys.length;i++){
    Object.defineProperty(global,windowKeys[i],{value:_window[windowKeys[i]]});
    console.log("global add key: " + windowKeys[i]);
    console.log("global add value: ",_window[windowKeys[i]]);
}

global.window = _window;


console.log("window injected");
