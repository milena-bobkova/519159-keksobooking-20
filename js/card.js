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
        hideItem(feature);
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
    if (ad.offer.photos.length) {
      popupPicture.src = ad.offer.photos[0];

      for (var i = 1; i < ad.offer.photos.length; i++) {
        var cardPhoto = popupPicture.cloneNode(true);
        cardPhoto.src = ad.offer.photos[i];
        picturesContainer.appendChild(cardPhoto);
      }
    } else {
      hideItem(popupPicture);
    }
  };

  var hideItem = function (item) {
    item.classList.add('hidden');
  };

  var getRoomsPluralForm = function (number, one, two, many) {
    var mod10 = number % 10;
    var mod100 = number % 100;
    switch (true) {
      case (mod100 >= 11 && mod100 <= 20):
        return number + many;
      case (mod10 > 5):
        return number + many;
      case (mod10 === 1):
        return number + one;
      case (mod10 >= 2 && mod10 <= 4):
        return number + two;
      default:
        return number + many;
    }
  };

  var getGuestsPluralForm = function (number, one, many) {
    var mod10 = number % 10;
    var mod100 = number % 100;
    switch (true) {
      case (mod100 >= 11 && mod100 <= 20):
        return number + many;
      case (mod10 >= 2):
        return number + many;
      case (mod10 === 1):
        return number + one;
      default:
        return number + many;
    }
  };

  /**
   * Отображение карточки объявления
   * @param {object} ad - данные объявления
   * @return {object} - сгенерированная карточка
   */
  var createNodeCard = function (ad) {
    var cardElement = mapCardTemplate.cloneNode(true);
    var cardElementPrice = cardElement.querySelector('.popup__text--price');
    var cardElementCapacity = cardElement.querySelector('.popup__text--capacity');
    var cardElementTime = cardElement.querySelector('.popup__text--time');
    var cardElementAvatar = cardElement.querySelector('.popup__avatar');

    var cardCloseButon = cardElement.querySelector('.popup__close');
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElementPrice.textContent = ad.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.roomTypes[ad.offer.type];
    cardElementCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElementTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    cardElementAvatar.src = ad.author.avatar;

    getCardFeatures(cardElement, ad);
    getCardPictures(cardElement, ad);

    cardCloseButon.addEventListener('click', window.map.cardMouseDownCloseHandler);

    if (ad.offer.price) {
      cardElementPrice.textContent = ad.offer.price + ' ₽/ночь';
    } else {
      hideItem(cardElementPrice);
    }

    if (ad.offer.checkin && ad.offer.checkout) {
      cardElementTime.textContent = 'заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    } else {
      hideItem(cardElementTime);
    }

    if (ad.offer.rooms || ad.offer.guests) {
      cardElementCapacity.textContent =
        getRoomsPluralForm(ad.offer.rooms,
          window.data.roomsNoun.one,
          window.data.roomsNoun.some,
          window.data.roomsNoun.many) +
        getGuestsPluralForm(ad.offer.guests,
          window.data.guestsNoun.one,
          window.data.guestsNoun.many,
          window.data.guestsNoun.noGuests);
    } else {
      hideItem(cardElementCapacity);
    }

    return cardElement;
  };

  window.card = {
    create: createNodeCard
  };
})();
