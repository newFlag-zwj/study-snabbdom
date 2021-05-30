import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'

// const myVnode = h('h3', {}, '123')
const myVnode = h('h3', {}, [
  h('h5', {}, '111'),
  h('h5', {}, '222'),
  h('h5', {}, '333'),
  h('h5', {}, '444')
])


console.log(myVnode)
const container = document.getElementById('container')
patch(container, myVnode)