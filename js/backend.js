'use strict';

(function () {
  var URL_GET = 'https://javascript.pages.academy/keksobooking/data';

  var Requests = {
    GET: 'GET'
  };

  var StatusCodes = {
    OK: 200
  };

  var TIMEOUT = 10000;

  /**
   * Функция загрузки данных с сервера
   * @param {function} onSuccess - коллбэк, срабатывающий при успешном выполнении запроса
   * @param {Function} onError - коллбэк, срабатывающий при неуспешном выполнении запроса
   */
  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCodes.OK) {
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

    xhr.open(Requests.GET, URL_GET);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
