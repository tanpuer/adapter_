import HTMLElement from './HTMLElement'


export default function image() {
    let img = new global.Image();
    let imageElement = new HTMLElement("img");
    img.__proto__.__proto__ = imageElement;

    img.complete = true;
    img.width = imageElement.style.width;
    img.height = imageElement.style.height;

    Object.getOwnPropertyNames(img).forEach((val)=>{console.log(val)});

    var oldAddEventListener = img.addEventListener;
    img.addEventListener = function (type, callback, options = {}) {
        if (type === "load") {
            img.onload = function () {
                console.log("image onload");
                callback.call(img);
            }
        }
        oldAddEventListener.call(this,type,callback,options);
    };

    return img;
}
