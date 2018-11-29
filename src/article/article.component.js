import Element from '../element/element.component';
import './article.style.less';

export default class Article extends Element{
  constructor(params) {
    super('article');
    this.elem.classList.add('article');

		let title = document.createElement('h2');
		title.innerHTML = params.title;

		let description = document.createElement('p');
		description.innerHTML = params.description;
		this.elem.appendChild(description);

  }
}