import patchVnode from "./patchVnode";
import createElement from "./creatElement";

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
  let oldStartVnode = oldChil[0];
  // 新前节点
  let newStartVnode = newChil[0];
  // 旧后节点
  let oldEndVnode = oldChil[oldEndIdx];
  // 新后节点
  let newEndVnode = newChil[newEndIdx];

  let keyMap = null;
  /* 
  1、新前与旧前
  2、新后与旧后
  3、新后与旧前
  4、新前与旧后
  */

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null || oldStartVnode == undefined) {
      oldStartVnode = oldChil[++oldStartIdx];
    } else if (oldEndVnode == null || oldEndVnode == undefined) {
      oldEndVnode = oldChil[--oldEndVnode];
    } else if (newStartVnode == null || newStartVnode == undefined) {
      newStartVnode = newChil[++newStartVnode];
    } else if (newEndVnode == null || newEndVnode == undefined) {
      newEndVnode = newChil[--newEndVnode];
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
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
    } else {
      // 四种都没有命中
      if (!keyMap) {
        keyMap = {};
        for (let i = oldStartIdx; i < oldChil.length; i++) {
          const key = oldChil[i].key;
          if(key != undefined) {
            keyMap[key] = i;
          }
        }
      }
      const idxInOld = keyMap[newStartVnode.key];
      if (idxInOld == undefined) {
        // 如果idxInOld为undefined则表示它为全新的项
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        // 不是全新的项，需要进项移动
        const elmToMove = oldChil[idxInOld];
        patchVnode(elmToMove, newStartVnode);
        // 设为undefined表示已经处理这项
        oldChil[idxInOld] = undefined;
        // 调用insertBefore实现移动
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
      }

      newStartVnode = newChil[++newStartIdx];
    }
  }

  // 循环结束后start还是比end小
  if (newStartIdx <= newEndIdx) {
    console.log("new中还有剩余");
    // 遍历新的，添加到老的没有处理的之前
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      parentElm.insertBefore(
        createElement(newChil[i]), oldChil[oldStartIdx].elm)
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log("old中还有剩余");
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldChil[i]) {
        // console.log(oldChil[i]);
        parentElm.removeChild(oldChil[i].elm);
      }
    }
  }
}
