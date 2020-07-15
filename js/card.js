'use strict';

(function () {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  /**
   * Данные для карточки объявления - преимущества
   * @param {object} card - DOM-элемент карточки объявления
   * @param {object} ad - данные объявления
   */
  var getCardFeatures = function (card, ad) {
    var featuresCollection = card.querySelectorAll('.popup__feature');

    featuresCollection.forEach(function (feature) {
      var newFeatureCollection = feature.className.split('--');
      if (ad.offer.features.indexOf(newFeatureCollection[1]) === -1) {
        hideItem(feature);
      }
    });
  };

  /**
   * Данные для карточки объявления - фото жилья
   * @param {object} card - DOM-элемент карточки объявления
   * @param {object} ad - данные объявления
   */
  var getCardPictures = function (card, ad) {
    var picturesContainer = card.querySelector('.popup__photos');
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

  /**
   * Функция скрытия элемента
   * @param {*} item - элемент
   */
  var hideItem = function (item) {
    item.classList.add('hidden');
  };

  /**
   * Функция изменения склонения
   * @param {number} number - количество комнат/гостей
   * @param {string} one - ед. число
   * @param {string} two - множ. число
   * @param {string} many - множ. число
   * @return {string}
   */
  var getNounPluralForm = function (number, one, two, many) {
    var mod10 = number % 10;
    var mod100 = number % 100;
    switch (true) {
      case (mod100 >= 11 && mod100 <= 20):
        return number + ' ' + many;
      case (mod10 > 5):
        return number + ' ' + many;
      case (mod10 === 1):
        return number + ' ' + one;
      case (mod10 >= 2 && mod10 <= 4):
        return number + ' ' + two;
      default:
        return number + ' ' + many;
    }
  };

  /**
   * Отображение карточки объявления
   * @param {object} ad - данные объявления
   * @return {object} - сгенерированная карточка
   */
  var createNodeCard = function (ad) {
    var card = mapCardTemplate.cloneNode(true);
    var cardPrice = card.querySelector('.popup__text--price');
    var cardCapacity = card.querySelector('.popup__text--capacity');
    var cardTime = card.querySelector('.popup__text--time');
    var cardAvatar = card.querySelector('.popup__avatar');

    var cardCloseButon = card.querySelector('.popup__close');
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardPrice.textContent = ad.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = window.data.roomTypes[ad.offer.type];
    cardCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    card.querySelector('.popup__description').textContent = ad.offer.description;
    cardAvatar.src = ad.author.avatar;

    getCardFeatures(card, ad);
    getCardPictures(card, ad);

    cardCloseButon.addEventListener('click', window.map.cardMouseDownCloseHandler);

    if (ad.offer.price) {
      cardPrice.textContent = ad.offer.price + ' ₽/ночь';
    } else {
      hideItem(cardPrice);
    }

    if (ad.offer.checkin && ad.offer.checkout) {
      cardTime.textContent = 'заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    } else {
      hideItem(cardTime);
    }

    if (ad.offer.rooms || ad.offer.guests) {
      cardCapacity.textContent =
        getNounPluralForm(ad.offer.rooms, window.data.roomsNoun.one, window.data.roomsNoun.some, window.data.roomsNoun.many) + ', ' +
        getNounPluralForm(ad.offer.guests, window.data.guestsNoun.one, window.data.guestsNoun.some, window.data.guestsNoun.many);
    } else {
      hideItem(cardCapacity);
    }

    return card;
  };

  window.card = {
    create: createNodeCard
  };
})();
