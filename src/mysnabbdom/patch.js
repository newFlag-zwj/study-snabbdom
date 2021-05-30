import vnode from './vnode'
import creatElement from './creatElement'

export default function (oldVnode, newVnode) {
  // 判断传入的第一个参数是DOM节点
  if(oldVnode.sel == '' || oldVnode.sel == undefined) {
    // 包装为虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  // 判断oldVnode和newVnode是不是同一个节点
  if(oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    // 是同一个节点
  } else {
    // 不是同一个节点
    let domNewVnode = creatElement(newVnode)
    // 插入上树
    if(oldVnode.elm.parentNode && domNewVnode) {
      oldVnode.elm.parentNode.insertBefore(domNewVnode, oldVnode.elm)
    }
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}