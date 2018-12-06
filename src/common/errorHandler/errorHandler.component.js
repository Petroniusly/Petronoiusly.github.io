import Element from '../../elements/element/element.component';
import {helper} from '../helper'
import './errorHandler.style.less';

let errorHandlerSingleton;
let bindClickEvent;

export class ErrorHandler extends Element {
  constructor(error) {
    if (errorHandlerSingleton) {
      return errorHandlerSingleton
    }


    errorHandlerSingleton = super('section');
    errorHandlerSingleton.elem.classList.add('popup');
    // this.elem.classList.add('popup_hide');

    const figure = document.createElement('figure');
    figure.classList.add('popup__body');

    const header = document.createElement('header');
    header.classList.add('popup-head');

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');

    const title = document.createElement('h2');
    title.classList.add('popup-head__title');
    title.innerHTML = error.code;
    header.appendChild(title);

    const description = document.createElement('p');
    description.classList.add('popup-head__message');
    description.innerHTML = error.message;
    popupContent.appendChild(description);

    const button = new Element('button');
    button.elem.type = 'button';
    button.elem.classList.add('popup__button', 'popup__button_close');
    button.elem.innerHTML = 'Close popup';
    popupContent.appendChild(button.elem);

    figure.appendChild(header);
    figure.appendChild(popupContent);

    errorHandlerSingleton.elem.appendChild(figure);
  };

  clickEvent() {
    this.removeEvent();
    this.closePopup();
  };


  openPopup() {
    this.addEvent();
    helper.find('body').classList.add('body_hidden');
    helper.find('.popup__body').classList.add('popup__body_visible');
  };

  addEvent() {
    bindClickEvent = this.clickEvent.bind(this);
    helper.on(helper.find('.popup__button_close'), 'click', bindClickEvent, true);
  };

  removeEvent() {
    helper.off(helper.find('.popup__button_close'), 'click', bindClickEvent, true);
  };

  closePopup() {
    helper.find('section.popup').remove();
  };
}