const _events = new WeakMap();

export default class EventTarget {

    constructor(){
        _events.set(this,{});
    }

    addEventListener(type,listener,options={}){
        let events = _events.get(this);
        if (!events){
            events = {};
            _events.set(this, events);
        }
        if (!events[type]) {
            events[type] = [];
        }
        events[type].push(listener);
    }

    removeEventListener(type,listener){
        let listeners = _events.get(this)[type];
        if (listeners && listeners.length){
            for (let i = 0; i < listeners.length; i++) {
                if (listeners[i] === listener){
                    listeners[i] = ()=>{};
                }
            }
        } 
    }

    dispatchEvent(event){
        if (event.type) {
            let listeners = _events.get(type);
            if (listeners && listeners.length) {
                for (let i = 0; i < listeners.length(); i++){
                    listeners[i](event);
                }
            }
        }
        console.log("dispatchEvent must have type!");
    }

}