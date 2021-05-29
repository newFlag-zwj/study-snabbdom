import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

// 常见patch函数
const patch = init ([classModule, propsModule, styleModule, eventListenersModule])



// 创建虚拟节点
// var myVnode1 = h('a', {props: {href: 'https://www.baidu.com', target: '_blank'}, }, '百度')
// 多层节点的嵌套
var myVnode2 = h('ul', [
  h('li', 11),
  h('li', 22),
  h('li', 33),
  h('li', 44)
])
console.log(myVnode2)

// 让虚拟节点上树
const container = document.getElementById('container')
// patch(container, myVnode1)
patch(container, myVnode2)