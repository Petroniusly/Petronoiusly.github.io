export const helper = {
  find: el => document.querySelector(el),
  on: (el, ev, fb, bubble) => el.addEventListener(ev, fb, bubble),
  off: (el, ev, fb, bubble) => el.removeEventListener(ev, fb, bubble),
  addClass: (el, classArr) => classArr.map((cssClass) => !el.classList.include(cssClass) ? el.classList.add(cssClass) : false),
  create: (elem, inner = '') => {
    const el = document.createElement(elem);
    el.innerHTML = inner;
    return el;
  },
  remove: (elem, delElem) => {
    const el = helper.find(elem);
    let onPageWrapper = helper.find(delElem);
    while (onPageWrapper) {
      el.removeChild(onPageWrapper);
      onPageWrapper = helper.find(delElem)
    }
    return el;
  }
}