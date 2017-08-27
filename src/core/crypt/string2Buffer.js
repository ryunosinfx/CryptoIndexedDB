const size = 1024;
export default class String2Buffer {
  static s2b(str) {
    let array = new Uint16Array([].map.call(str, (c) => {
      return c.charCodeAt(0)；
    }));
    return array.buffer;
  }

  static b2s(buf) {
    let tmp = [];
    let bufLen = buf.byteLength;
    for (let p = 0; p < bufLen; p += size) {
      let currentBuf = buf.slice(p, p + size);
      tmp.push(String.fromCharCode.apply("", new Uint16Array(currentBuf));}
    return tmp.join("");
  }
  static base64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }
  static base64Dcode(str) {
    return decodeURIComponent(escape(atob(str)));
  }
  static b2Base64( buffer ) {
      var binary = '';
      var bytes = new Uint8Array( buffer );
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
          binary += String.fromCharCode( bytes[ i ] );
      }
      return window.btoa( binary );
  }
  function base642b(base64) {
      var binary_string =  window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array( len );
      for (var i = 0; i < len; i++)        {
          bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
  }
}
