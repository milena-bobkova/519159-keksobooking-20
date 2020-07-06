'use strict';

(function () {
  var URL_GET = 'https://javascript.pages.academy/keksobooking/data';
  var URL_POST = 'https://javascript.pages.academy/keksobooking';

  var TIMEOUT = 10000;

  var StatusCode = {
    OK: 200
  };

  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  /**
   * Функция загрузки данных с сервера
   * @param {function} onSuccess - коллбэк, срабатывающий при успешном выполнении запроса
   * @param {Function} onError - коллбэк, срабатывающий при неуспешном выполнении запроса
   */
  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  var save = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  /**
 * Функция, срабатывающая при неуспешном выполнении запроса на сервер
 * @param {string} errorMessage - текст ошибки
 */
  var errorHandler = function (errorMessage) {
    var message = errorMessageTemplate.cloneNode(true);
    var errorText = message.querySelector('.error__message');
    errorText.textContent = errorMessage;

    document.querySelector('main').appendChild(message);

    var errorButton = message.querySelector('.error__button');
    errorButton.addEventListener('click', errorButtonClickHandler);
    document.addEventListener('keydown', errorEscKeyDownHandler);
    document.addEventListener('click', errorWindowClickHandler);
  };

  /**
   * Закрытие окна ошибки нажатием на кнопку
   */
  var errorButtonClickHandler = function () {
    document.querySelector('div.error').remove();
  };

  /**
   * Закрытие окна ошибки нажатием на Esc
   * @param {*} evt - объект события
   */
  var errorEscKeyDownHandler = function (evt) {
    if (evt.key === 'Escape') {
      document.querySelector('div.error').remove();
    }
  };

  /**
   * Закрытие окна ошибки нажатием на произвольную область экрана
   * @param {*} evt - объект события
   */
  var errorWindowClickHandler = function (evt) {
    if (evt.target.matches('div.error')) {
      document.querySelector('div.error').remove();
    }
  };

  window.backend = {
    load: load,
    save: save,
    errorHandler: errorHandler
  };
})();
