import h from "./mysnabbdom/h";
import patch from "./mysnabbdom/patch";

const myVnode1 = h("ul", { key: 1 }, [
  h("li", { key: 1 }, "111"),
  h("li", { key: 2 }, "222"),
  h("li", { key: 3 }, "333"),
  h("li", { key: 4 }, "444"),
]);
const myVnode2 = h("ul", { key: 1 }, [
  h("li", { key: 4 }, "4444"),
  h("li", { key: 3 }, "3333"),
  h("li", { key: 2 }, "2222"),
  h("li", { key: 1 }, "1111"),
]);

const container = document.getElementById("container");
const btn = document.getElementById("btn");
patch(container, myVnode1);

btn.onclick = function () {
  patch(myVnode1, myVnode2);
};
