import '@babel/polyfill';
import FetchService from './common/fetch/fetch.component';
import {helper} from './common/helper';
import Element from './elements/element/element.component';
import Wrapper from './elements/wrapper/wrapper.component';
import './less/main.less';

const fetchService = new FetchService;
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

const NewsDisclaimer = new Element('a');
NewsDisclaimer.elem.href = 'https://newsapi.org/';
NewsDisclaimer.elem.innerHTML = 'powered by NewsAPI.org';


HeaderWrapper.append(Button.elem);
FooterWrapper.append(NewsDisclaimer.elem);

Header.append(HeaderWrapper.elem);
Main.append(MainWrapper.elem);
Footer.append(FooterWrapper.elem);

App.elem.classList.add('app-body');
App
  .append(Header.elem)
  .append(Main.elem)
  .append(Footer.elem)
  .makeFragment()
  .appendToElement();


helper.on(helper.find('button'), 'click', () => {

  import (
    /* webpackChunkName: "article" */
    './elements/article/article.component'
    ).then(({Article}) => {
    fetchService.request()
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response);
        if (response.status === 'error') {
          throw(response);
        }
        let ArticleElement;

        helper.remove('main', 'main section.wrapper');

        for (let i = 0; i < response.articles.length; i++) {
          ArticleElement = new Article(response.articles[i]);
          MainWrapper.append(ArticleElement.elem)
        }

        MainWrapper
          .makeFragment()
          .appendToElement(helper.find('main'))
      })
      .catch(error => {
        import(
          /* webpackChunkName: "article" */
          './common/errorHandler/errorHandler.component'
          ).then(({ErrorHandler}) => {
          let errorHandler = new ErrorHandler(error);

          errorHandler.makeFragment();
          helper.find('body').insertBefore(errorHandler.elem, helper.find('body > header'));
          errorHandler.openPopup();
        });
      })
  });
});