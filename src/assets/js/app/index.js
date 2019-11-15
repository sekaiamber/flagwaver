/**
 * Flag Waver
 *
 * Simulate a flag waving in the breeze right in your browser window.
 *
 * /u/krikienoid
 *
 */

import initFlagWaverApp from './main';

import flagImg from '../../img/flag_bg.png';

var app;

//
// Flag Waver UI
//

// Settings
var flagWaverDefaults = {
    isWindOn: true,
    flag: {
        imgUploadMode: 'web',
        imgURL:        '',
        imgFilePath:   '',
        hoisting:      'dexter',
        // hoisting:      'sinister',
        topEdge:       'top'
    }
};

// Functions
//

// 设置旗帜基础
function setFlagOpts(flagData) {
    app.module('flagGroupModule').flag.setOptions(flagData);
}

// 控制风速
function setWind(value) {
    app.module('windModule').setOptions({ speed: value });
    app.module('windForceModule').needsUpdate = true;
}
//
// Init
//

document.addEventListener('DOMContentLoaded', () => {

    // Init flagWaver and append renderer to DOM
    app = initFlagWaverApp();
    window.FW_App = app;
    document.getElementById('flag').appendChild(app.renderer.domElement);
    window.dispatchEvent(new window.Event('resize'));
    
    // Load settings from hash vars on page load
    // setFlagOpts({
    //     imgSrc: flagWaverDefaults.flag.imgURL || flagImg,
    //     topEdge: flagWaverDefaults.flag.topEdge,
    //     hoisting: flagWaverDefaults.flag.hoisting
    // });
    setFlagOpts({
        imgSrc: flagImg,
        topEdge: flagWaverDefaults.flag.topEdge,
        hoisting: flagWaverDefaults.flag.hoisting
    });
});
