const size = 1024;
export default class String2Buffer {
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
