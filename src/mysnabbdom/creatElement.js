export default function createElement(vnode) {
  // 创建dom节点
  let domNode = document.createElement(vnode.sel)
  // 没有子结点
  if (vnode.sel != '' && (vnode.children == undefined || vnode.children.length == 0)) {
    domNode.innerText = vnode.text

  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 存在子结点(进行递归)
    for(let i = 0; i < vnode.children.length; i++) {
      let ch = vnode.children[i]
      // console.log(ch)
      let chDom = createElement(ch)
      domNode.appendChild(chDom)

    }
  }
  vnode.elm = domNode

  return vnode.elm    
}