/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const ua = navigator.userAgent.replace(/[\.0-9]+/g,"x");
const domain = window.location;
/* harmony default export */ __webpack_exports__["a"] = ({
  dbName:"ECIDBEM",
  ua:ua,
  domain:domain,
  iv:"ECIDBEMiv🚉出ベム",
  strechCount:10020
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(5);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_constant__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_crypt_webcrypter__ = __webpack_require__(3);



let webCrypter = WebCrypter();


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__string2Buffer__ = __webpack_require__(4);


const AES_CBC = "AES-CBC";
const scubtleCrypto = crypto.subtle;
const iv = crypto.getRandomValues(new Uint8Array(12));
const algorithm = {
  name: AES_CBC,
  iv: __WEBPACK_IMPORTED_MODULE_1__string2Buffer__["a" /* default */].s2b(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */].iv)
};
const hashLevel = "SHA-512";
class WebCrypter {
  constructor() {}
  hash(dataString, salt1, salt2) {
    return hashExecute(dataString, salt1, salt2, 0);
  }
  //　ストレッチ回数分回るよ！
  hashExecute(dataString, salt1, salt2, count) {
    let self = this
    count++;
    return new Promise((resolve, reject) => {
      scubtleCrypto.digest(hashLevel, dataString).then((keyBuffer) => {
        if (__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */].strechCount > count) {
          let nextDataString = salt1 + __WEBPACK_IMPORTED_MODULE_1__string2Buffer__["a" /* default */].b2Base64(keyBuffer) + salt2;
          self.hashExecute(nextDataString, salt1, salt2, count)
        } else {
          resolve(__WEBPACK_IMPORTED_MODULE_1__string2Buffer__["a" /* default */].b2Base64(keyBuffer));
        }
      }, (e) => {
        console.log(e);
        reject(e);
      })
    });
  }
  //Data only String, you need JSON.stringify.
  encrypt(key, dataString) {
    return new Promise((resolve, reject) => {
      scubtleCrypto.digest(hashLevel, key).then((keyBuffer) => {
        //buffer is binary
        let dataBuffer = __WEBPACK_IMPORTED_MODULE_1__string2Buffer__["a" /* default */].s2b(dataString);
        scubtleCrypto.encrypt(algorithm, keyBuffer, dataBuffer).then((result) => {
          resolve(result);
        }, (e) => {
          console.log(e);
          reject(e);
        });

      }, (e) => {
        console.log(e);
        reject(e);
      });
    });
  }
  //
  decrypt(key, cryptBuffer) {
    return new Promise((resolve, reject) => {
      scubtleCrypto.digest(hashLevel, key).then((keyBuffer) => {
        //buffer is binary
        scubtleCrypto.decrypt(algorithm, keyBuffer, cryptBuffer).then((result) => {
          let resultString = __WEBPACK_IMPORTED_MODULE_1__string2Buffer__["a" /* default */].s2b(result);
          resolve(resultString);
        }, (e) => {
          console.log(e);
          reject(e);
        });

      }, (e) => {
        console.log(e);
        reject(e);
      });
    });
  }

}
/* unused harmony export default */



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const size = 1024;
class String2Buffer {
  // string to buffer
  static s2b(str) {
    let array = new Uint16Array([].map.call(str, (c) => {
      return c.charCodeAt(0)
    }));
    return array.buffer;
  }
  // buffer to string
  static b2s(buf) {
    let tmp = [];
    let bufLen = buf.byteLength;
    for (let p = 0; p < bufLen; p += size) {
      let currentBuf = buf.slice(p, p + size);
      tmp.push(String.fromCharCode.apply("", new Uint16Array(currentBuf)));
    }
    return tmp.join("");
  }
  static base64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }
  static base64Dcode(str) {
    return decodeURIComponent(escape(atob(str)));
  }
  // buffer to BASE64 string
  static b2Base64( buffer ) {
      let binary = '';
      let bytes = new Uint8Array( buffer );
      let len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
          binary += String.fromCharCode( bytes[ i ] );
      }
      return window.btoa( binary );
  }
  // BASE64 string to buffer
  static base642b(base64) {
      let binary_string =  window.atob(base64);
      let len = binary_string.length;
      let bytes = new Uint8Array( len );
      for (let i = 0; i < len; i++)        {
          bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = String2Buffer;



/***/ }),
/* 5 */
/***/ (function(module, exports) {



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map