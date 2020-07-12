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

  /**
 * Функция изменения окончаний для блока "Комнаты"
 * @param {*} rooms - блок комнат
 * @return {string} str
 */
  var pluralizeRooms = function (rooms) {
    var str = '';

    switch (rooms) {
      case 1:
        str = '1 комната';
        break;

      case 100:
        str = ' 100 комнат';
        break;

      default:
        str = rooms + ' комнаты';
    }
    return str;
  };

  /**
   * Функция изменения окончаний для блока "Гости"
   * @param {*} guests - блок гостей
   * @return {string} str
   */
  var pluralizeGuests = function (guests) {
    var str = '';

    switch (guests) {
      case 0:
        break;

      case 1:
        str = ' для 1 гостя';
        break;

      default:
        str = ' для ' + guests + ' гостей';
    }
    return str;
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
      cardElementCapacity.textContent = pluralizeRooms(ad.offer.rooms) + pluralizeGuests(ad.offer.guests);
    } else {
      hideItem(cardElementCapacity);
    }

    return cardElement;
  };

  window.card = {
    create: createNodeCard
  };
})();
