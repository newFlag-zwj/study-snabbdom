/* 
将传入的参数组合为一个对象返回
*/
// sel为标签名
// data为属性对象
// children为子元素数组
// text为标签内的文本
// elm为该dom元素
// key为data中的属性，作为唯一标识符
export default function (sel, data, children, text, elm) {
  const key = data.key
  return {
    sel, data, children, text, elm, key
  }
}
 