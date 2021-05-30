import patchVnode from "./patchVnode";

// 检查是否为同一对象
function checkSameVnode(a, b) {
  return a.sel == b.sel && a.key == b.key;
}
export default function updateChildren(parentElm, oldChil, newChil) {
  console.log("updateChildren");
  // 旧前
  let oldStartIdx = 0;
  // 新前
  let newStartIdx = 0;
  // 旧后
  let oldEndIdx = oldChil.length - 1;
  // 新后
  let newEndIdx = newChil.length - 1;
  // 旧前节点
  let oldStartVnode = oldChil[oldStartIdx];
  // 新前节点
  let newStartVnode = newChil[newStartIdx];
  // 旧后节点
  let oldEndVnode = oldChil[oldEndIdx];
  // 新后节点
  let newEndVnode = newChil[newEndIdx];
  /* 
  1、新前与旧前
  2、新后与旧后
  3、新后与旧前
  4、新前与旧后
  */

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (checkSameVnode(oldStartVnode, newStartVnode)) {
      // 1、新前与旧前
      console.log("1命中新前与旧前");
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldChil[++oldStartIdx];
      newStartVnode = newChil[++newStartIdx];
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      // 2、新后与旧后
      console.log("2命中新后与旧后");
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldChil[--oldEndIdx];
      newEndVnode = newChil[--newEndIdx];
    } else if (checkSameVnode(newEndVnode, oldStartVnode)) {
      // 3、新后与旧前
      console.log("3命中新后与旧前");
      patchVnode(oldStartVnode, newEndVnode);
      // 移动新前指向的节点到老节点旧后的后面
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      newEndVnode = newChil[--newEndIdx];
      oldStartVnode = oldChil[++oldStartIdx];
    } else if (checkSameVnode(newStartVnode, oldEndVnode)) {
      // 4、新前与旧后
      console.log("4命中新前与旧后");
      patchVnode(oldEndVnode, newStartVnode);
      // 移动新前指向的节点到老节点旧前的前面
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      newStartVnode = newChil[++newStartIdx];
      oldEndVnode = oldChil[--oldEndIdx];
    }
  }
}
