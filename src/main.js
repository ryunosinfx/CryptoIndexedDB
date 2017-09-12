import constant from './core/constant'
import {patch, h} from './view/preLoader'
import WebcryptTest from './view/test/webcryptTest'
import AuthoricatorTest from './view/test/autoricatorTest'
console.log('logger.js is now loaded...');
let testOne = new WebcryptTest();
let testTwo = new AuthoricatorTest();
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
  elements[0].innerHTML = '<h1>Hellow!</h1><div id="container"></div>';
  let containerNode = document.getElementById("container");
  testOne.test(containerNode);
  testTwo.test(containerNode);
  // patch(elements[0], vnode);
  // let newVnode = h('div#container.two.classes', {
  //   on: {
  //     click: ()=>{alert("here we are!"); return false;}
  //   }
  // }, [
  //   h('span', {
  //     style: {
  //       fontWeight: 'normal',
  //       fontStyle: 'italic'
  //     }
  //   }, 'This is now italic type'),
  //   ' and this is still just normal text',
  //   h('a', {
  //     props: {
  //       href: '/'
  //     }
  //   }, 'I\'ll take you places!')
  // ]);
  // patch(vnode, newVnode);
};
