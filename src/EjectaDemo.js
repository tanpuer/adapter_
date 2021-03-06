
var w = 100, h = 100;
var w2 = w / 2, h2 = h/2;
var lastFrame = 0,fps = 60;

var ctx;

var curves = [];
for( var i = 0; i < 200; i++ ) {
    curves.push({
        current: Math.random() * 1000,
        inc: Math.random() * 0.005 + 0.002,
        color: '#'+(Math.random()*0xFFFFFF<<0).toString(16) // Random color
    });
}

var maxCurves = 70;

var requestNextFrame;
var animate;

var p = [0,0, 0,0, 0,0, 0,0];
var _this;

export default class EjectaDemo {

    constructor(){
        _this = this;
        this.domReady();
    }

    setup() {
        ctx.fillStyle = '#000000';
        ctx.font = '12pt arial';
        ctx.globalAlpha = 1;
        ctx.fillRect( 0, 0, w, h );
        // ctx.clearRect( 0, 0, w, h );
        console.log("setup: Cleared ", w, h);

        ctx.globalAlpha = 0.05;
        ctx.lineWidth = 2;

        animate = this.setAnimation;

        requestNextFrame();

    }

    setAnimation() {
        var now = Date.now();
        // Clear the screen - note that .globalAlpha is still honored,
        // so this will only "darken" the sceen a bit
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillRect(0,0,w,h);

        // Use the additive blend mode to draw the bezier curves
        ctx.globalCompositeOperation = 'lighter';

        // Calculate curve positions and draw
        for( var i = 0; i < maxCurves; i++ ) {
            var curve = curves[i];
            curve.current += curve.inc;
            for( var j = 0; j < p.length; j+=2 ) {
                var a = Math.sin( curve.current * (j+3) * 373 * 0.0001 );
                var b = Math.sin( curve.current * (j+5) * 927 * 0.0002 );
                var c = Math.sin( curve.current * (j+5) * 573 * 0.0001 );
                p[j] = (a * a * b + c * a + b) * w * c + w2;
                p[j+1] = (a * b * b + c - a * b *c) * h2 + h2;
            }

            ctx.beginPath();
            ctx.moveTo( p[0], p[1] );
            ctx.bezierCurveTo( p[2], p[3], p[4], p[5], p[6], p[7] );
            ctx.strokeStyle = curve.color;
            ctx.stroke();
        }

        ctx.globalCompositeOperation = 'source-over';

        ctx.globalAlpha = 1;
        ctx.fillRect(0,0,100,30);

        if(lastFrame) {
            var lastLineWidth = ctx.lineWidth;
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ff0000';
            fps = (1000/(now-lastFrame))*0.05+fps*0.95;
            ctx.strokeText('FPS: ' + fps.toFixed(2),10,20);
            ctx.lineWidth = lastLineWidth;
        }
        ctx.globalAlpha = 0.05;

        lastFrame = now;
        requestNextFrame();
    };

    domReady() {
        if (typeof document != "undefined") {
            // Only runs in browser
            var scale = window.devicePixelRatio; // <--- Change to 1 on retina screens to see blurry canvas.
            w = window.innerWidth * scale;
            h = window.innerHeight * scale;
            w2 = w / 2;
            h2 = h / 2;

            console.log("width, height: " + w + ", " + h + ", " + scale);

            var canvas = document.getElementById('canvas');

            // Set actual size in memory (scaled to account for extra pixel density).

            // var scale = 1;
            canvas.width = w / scale;
            canvas.height = h / scale;

            ctx = canvas.getContext('2d');

            // Normalize coordinate system to use css pixels.
            ctx.scale(1 / scale, 1 / scale);

            requestNextFrame = function () {
                if (typeof requestAnimationFrame == "undefined") {
                    setTimeout(animate, 16);
                } else {
                    requestAnimationFrame(animate);
                }
            }

            this.setup();

        }
    }
}

