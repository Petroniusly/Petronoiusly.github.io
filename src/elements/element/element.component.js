import './element.style.less';

export default class Element {
  constructor(elem) {
    this.elem = document.createElement(elem);
    this.fragment = document.createDocumentFragment();
    this.fragmented = false;
  }

  append(elem) {
    this.elem.appendChild(elem);
    return this;
  }

  makeFragment() {
    this.fragmented = true;
    this.fragment.appendChild(this.elem);
    return this;
  }

  appendToElement(elem = document.body) {
    if (this.fragmented) elem.appendChild(this.fragment);
    else throw new Error('You need create fragment before appending to DOM.');
  }


}