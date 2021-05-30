import createElement from "./creatElement";
import updateChildren from "./updateChildren";
export default function patchVnode(oldVnode, newVnode) {
  // 是同一个节点
  // 是否为同一对象
  if (oldVnode == newVnode) return;

  // console.log("不是同一个对象节点");
  // 新节点有text属性无children属性
  if (
    newVnode.text != undefined &&
    (newVnode.children == undefined || newVnode.children.length == 0)
  ) {
    // console.log("新节点有text属性无children属性");
    oldVnode.elm.innerText = newVnode.text;
  } else {
    // 新节点没有text但是有children属性
    // console.log("新节点没有text属性");
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {
      // console.log("新老节点都有children");
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
    } else {
      // console.log("老节点没有children");
      // 清空oldVnode的text属性
      oldVnode.elm.innerText = "";
      // 循环遍历
      for (let i = 0; i < newVnode.children.length; i++) {
        let dom = creatElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom);
      }
    }
  }
}
