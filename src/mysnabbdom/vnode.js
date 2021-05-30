/* 
将传入的参数组合为一个对象返回
*/
// sel为标签名
// data为属性对象
// children为子元素数组
// text为标签内的文本
// elm为该dom元素
export default function (sel, data, children, text, elm) {
  return {
    sel, data, children, text, elm
  }
}
 