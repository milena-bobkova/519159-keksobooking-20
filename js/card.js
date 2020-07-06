'use strict';

(function () {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  /**
   * Данные для карточки объявления - преимущества
   * @param {object} cardElement - DOM-элемент карточки объявления
   * @param {object} ad - данные объявления
   */
  var getCardFeatures = function (cardElement, ad) {
    var featuresCollection = cardElement.querySelectorAll('.popup__feature');

    featuresCollection.forEach(function (feature) {
      var newFeatureCollection = feature.className.split('--');
      if (ad.offer.features.indexOf(newFeatureCollection[1]) === -1) {
        feature.classList.add('visually-hidden');
      }
    });
  };

  /**
   * Данные для карточки объявления - фото жилья
   * @param {object} cardElement - DOM-элемент карточки объявления
   * @param {object} ad - данные объявления
   */
  var getCardPictures = function (cardElement, ad) {
    var picturesContainer = cardElement.querySelector('.popup__photos');
    var popupPicture = picturesContainer.querySelector('.popup__photo');
    popupPicture.src = ad.offer.photos[0];

    for (var i = 1; i < ad.offer.photos.length; i++) {
      var cardPhoto = popupPicture.cloneNode(true);
      cardPhoto.src = ad.offer.photos[i];
      picturesContainer.appendChild(cardPhoto);
    }
  };

  /**
   * Отображение карточки объявления
   * @param {object} ad - данные объявления
   * @return {object} - сгенерированная карточка
   */
  var createNodeCard = function (ad) {
    var cardElement = mapCardTemplate.cloneNode(true);

    var cardCloseButon = cardElement.querySelector('.popup__close');
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.roomTypes[ad.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    getCardFeatures(cardElement, ad);
    getCardPictures(cardElement, ad);

    cardCloseButon.addEventListener('click', window.map.cardMouseDownCloseHandler);
    document.addEventListener('keydown', window.map.cardKeydownEscCloseHandler);

    return cardElement;
  };

  window.card = {
    create: createNodeCard
  };
})();
