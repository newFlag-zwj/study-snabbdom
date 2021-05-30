import vnode from "./vnode";
import creatElement from "./creatElement";
import patchVnode from "./patchVnode";

export default function patch(oldVnode, newVnode) {
  // 判断传入的第一个参数是DOM节点
  if (oldVnode.sel == "" || oldVnode.sel == undefined) {
    // 包装为虚拟节点
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    );
  }

  // 判断oldVnode和newVnode是不是同一个节点
  if (oldVnode.sel == newVnode.sel && oldVnode.key == newVnode.key) {
    console.log("sel相同,key相同");
    patchVnode(oldVnode, newVnode);
  } else {
    // 不是同一个节点
    console.log("sel不同");
    let domNewVnode = creatElement(newVnode);
    // 插入上树
    if (oldVnode.elm.parentNode && domNewVnode) {
      oldVnode.elm.parentNode.insertBefore(domNewVnode, oldVnode.elm);
    }
    oldVnode.elm.parentNode.removeChild(oldVnode.elm);
  }
}
