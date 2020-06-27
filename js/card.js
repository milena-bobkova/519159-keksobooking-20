'use strict';

(function () {
  /**
   * Данные для карточки объявления - преимущества
   * @param {object} cardElement - DOM-элемент карточки объявления
   * @param {object} cardData - данные объявления
   */
  var getCardFeatures = function (cardElement, cardData) {
    var featuresCollection = cardElement.querySelectorAll('.popup__feature');

    featuresCollection.forEach(function (feature) {
      var newFeatureCollection = feature.className.split('--');
      if (cardData.offer.features.indexOf(newFeatureCollection[1]) === -1) {
        feature.classList.add('visually-hidden');
      }
    });
  };

  /**
   * Данные для карточки объявления - фото жилья
   * @param {object} cardElement - DOM-элемент карточки объявления
   * @param {object} cardData - данные объявления
   */
  var getCardPictures = function (cardElement, cardData) {
    var picturesContainer = cardElement.querySelector('.popup__photos');
    var popupPicture = picturesContainer.querySelector('.popup__photo');
    popupPicture.src = cardData.offer.photos[0];

    for (var i = 1; i < cardData.offer.photos.length; i++) {
      var cardPhoto = popupPicture.cloneNode(true);
      cardPhoto.src = cardData.offer.photos[i];
      picturesContainer.appendChild(cardPhoto);
    }
  };

  /**
   * Отображение карточки объявления
   * @param {object} cardData - сгенерированные данные
   * @return {object} - сгенерированная карточка
   */
  var createNodeCard = function (cardData) {
    var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = mapCardTemplate.cloneNode(true);
    var cardCloseButon = cardElement.querySelector('.popup__close');
    cardElement.querySelector('.popup__title').textContent = cardData.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = cardData.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = cardData.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = cardData.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    getCardFeatures(cardElement, cardData);
    getCardPictures(cardElement, cardData);
    cardElement.querySelector('.popup__description').textContent = cardData.offer.description;
    cardElement.querySelector('.popup__avatar').src = cardData.author.avatar;
    cardCloseButon.addEventListener('click', window.map.popupMouseDownCloseHandler);
    document.addEventListener('keydown', window.map.popupKeydownEscCloseHandler);
    return cardElement;
  };

  window.card = {
    create: createNodeCard
  };
})();
