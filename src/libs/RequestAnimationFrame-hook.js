var oldFunc = requestAnimationFrame;
requestAnimationFrame = function (callback) {
    global.endTime = Performance.now();
    if (global.beginTime){
        console.log(1000/(global.endTime - global.beginTime));
    }
    oldFunc.call(this,callback);
    global.beginTime = Performance.now();
};