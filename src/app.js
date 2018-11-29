import '@babel/polyfill';
import Element from './element/element.component';
import Wrapper from './wrapper/wrapper.component';
import FetchService from './services/fetch.component';
import Article from './article/article.component';
import { helper } from './helper';
import './less/main.less';

const fetchService = new FetchService;
let articleArr = [];
const App = new Element('div');

const Header = new Element('header');
const HeaderWrapper = new Wrapper();

const Main = new Element('main');
let MainWrapper = new Wrapper();

const Footer = new Element('footer');
const FooterWrapper = new Wrapper();

const Button = new Element('button');

Button.elem.type = 'button';
Button.elem.classList.add('button');
Button.elem.innerHTML = 'Show articles';


HeaderWrapper.append(Button.elem);

Header.append(HeaderWrapper.elem);
Main.append(MainWrapper.elem);
Footer.append(FooterWrapper.elem);

App
	.append(Header.elem)
	.append(Main.elem)
	.append(Footer.elem)
	.makeFragment()
	.appendToElement();






helper.on(helper.find('button'), 'click', e => {
	fetchService.request()
		.then(function(response) {
			return response.json();
		})
		.then(responce => {
			let ArticleElement;

			helper.remove('main', 'main section.wrapper');

			for (let i = 0; i < responce.sources.length; i++) {
				ArticleElement = new Article(responce.sources[i]);
				MainWrapper.append(ArticleElement.elem)
			}

			MainWrapper
				.makeFragment()
				.appendToElement(helper.find('main'))
		});
});



// createEl(App)
// createEl('header').addTo(App)
// createEl('body').addTo(App)
// createEl('footer').addTo(App)
//
// createEl('logo').addTo(header)
// createEl('number').addTo(header)
// createEl('source').addTo(header)
// createEl('go').addTo(header)
//
// createEl('subscription').addTo(footer)
//
// while() {
// 	createEl('article').addTo(body);
// }