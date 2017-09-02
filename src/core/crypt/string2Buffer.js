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
  static base64UrlEncode(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }
  static base64UrlDcode(str) {
    return decodeURIComponent(escape(atob(str)));
  }
  static bin2base64Url(str) {
    let base64Str = window.btoa(str);
    base64Str = base64Str.replace(/\+/g, "-");
    base64Str = base64Str.replace(/\//g, "_");
    base64Str = base64Str.replace(/=/g, "");
    return base64Str;
  }
  static base64Url2bin(str) {
    let paddingCount = str.Length % 4;
    paddingCount = paddingCount !== 0
      ? 4 - paddingCount
      : paddingCount;
    let padding = "";
    for (let i = 0; i < paddingCount; i++) {
      padding += "=";
    }
    let base64Str = window.btoa(str);
    base64Str = base64Str.replace(/-/g, "+");
    base64Str = base64Str.replace(/_/g, "/") + padding;
    return decodeURIComponent(escape(atob(str)));
  }
  static unitbs(segs) {
    let sumLength = 0;
    let coutSegs = segs.length;
    for (let i = 0; i < coutSegs; ++i) {
      sumLength += segs[i].byteLength;
    }
    let united = new Uint8Array(sumLength);
    let pos = 0;
    for (let j = 0; j < coutSegs; ++j) {
      let seg = segs[j];
      united.set(new Uint8Array(seg), pos);
      pos += seg.byteLength;
    }
    return united.buffer;

  }
  // buffer to BASE64Url string
  static b2Base64Url(buffer) {
    let binary = String2Buffer.b2Base64Execute(buffer);
    return String2Buffer.bin2base64Url(binary);
  }
  // BASE64Url string to buffer
  static base642bUrl(base64) {
    let binaryString = String2Buffer.base64Url2bin(base64);
    return String2Buffer.base642bExecute(binaryString);
  }
  // buffer to BASE64 string
  static b2Base64(buffer) {
    let binary = String2Buffer.b2Base64Execute(buffer);
    return window.btoa(binary);
  }
  // BASE64 string to buffer
  static base642b(base64) {
    let binaryString = window.atob(base64);
    return String2Buffer.base642bExecute(binaryString);
  }
  // buffer to BASE64 string
  static b2Base64Execute(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return binary;
  }
  // BASE64 string to buffer
  static base642bExecute(binary_string) {
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
