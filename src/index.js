import h from './mysnabbdom/h'

const myVnode = h('div', '123', [
  h('p', {}, '123'),
  h('p', {}, '123'),
  h('p', {}, '123'),
  h('p', {}, h('span', {}, 'three'))
])
console.log(myVnode)