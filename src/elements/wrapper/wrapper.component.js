import Element from '../element/element.component';
import './wrapper.style.less';

export default class Wrapper extends Element {
  constructor() {
    super('section');
    this.elem.classList.add('wrapper');
  }
}