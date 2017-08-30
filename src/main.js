import constant from './core/constant'
import Webcrypter from './core/crypt/webcrypter'
import snabbdomClass from 'snabbdom/modules/class'
import snabbdomStyle from 'snabbdom/modules/style'
import snabbdomProps from 'snabbdom/modules/props'
import snabbdomEventlisteners from 'snabbdom/modules/eventlisteners'
import h from 'snabbdom/h'
let snabbdom = require('snabbdom');
console.log(snabbdom);
let patch = snabbdom.init([snabbdomClass, snabbdomStyle, snabbdomProps, snabbdomEventlisteners]);
console.log('logger.js is now loaded...');
let webCrypter = new Webcrypter();
let vnode = h('div', {
  style: {
    color: '#000'
  }
}, [
  h('h1', 'Headline'),
  h('p', 'A paragraph')
]);
window.onload = () => {
  let elements = document.getElementsByTagName("body");
  elements[0].innerHTML = '<h1>Hellow!</h1><div id="container"></div>'
  let elements = document.getElementsByTagName("body");
  patch(elements[0], vnode);
  let newVnode = h('div#container.two.classes', {
    on: {
      click: () => {
        alert("here we are!");
        return false;
      }
    }
  }, [
    h('span', {
      style: {
        fontWeight: 'normal',
        fontStyle: 'italic'
      }
    }, 'This is now italic type'),
    ' and this is still just normal text',
    h('a', {
      props: {
        href: '/'
      }
    }, 'I\'ll take you places!')
  ]);
  patch(vnode, newVnode);
};
