import React from "react";
import {GlobalKeyboardListener} from "node-global-key-listener";



//Log every key that's pressed.
const v = new GlobalKeyboardListener();

function capture() {
v.addListener(function (e, down) {
    console.log(
        `${e.name} ${e.state == "DOWN" ? "DOWN" : "UP  "} [${e.rawKey._nameRaw}]`
    );
});

return (
    <div id="capture">
    
    
    </div>
)


}

export default capture;