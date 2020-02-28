// https://twitter.com/_developit/status/1232748388929736704

export default function h(t, props, ...kids) {
  let el = document.createElement(t);
  for (let i in props)
    i in el ? (el[i] = props[i]) : el.setAttribute(i, props[i]);
  el.append(...kids);
  return el;
}
