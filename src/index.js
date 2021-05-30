import h from "./mysnabbdom/h";
import patch from "./mysnabbdom/patch";

const myVnode1 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E')
]);
const myVnode2 = h('ul', {}, [
  h('li', { key: 'Q' }, 'Q'),
  h('li', { key: 'T' }, 'T'),
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'Z' }, 'Z'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E')
]);

const container = document.getElementById("container");
const btn = document.getElementById("btn");
patch(container, myVnode1);

btn.onclick = function () {
  patch(myVnode1, myVnode2);
};
