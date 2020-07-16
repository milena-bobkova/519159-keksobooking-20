'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreviewBlock = document.querySelector('.ad-form-header__preview img');
  var avatarDefaultPicture = avatarPreviewBlock.src;

  var photoChooser = document.querySelector('#images');
  var photoPreviewBlock = document.querySelector('.ad-form__photo');

  var imageLoader = function (fileChooser, filePreview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        filePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  /**
  * Функция создания изображения и добавления его в разметку
  * @return {*} photoElement
  */
  var createPhotoPreview = function () {
    var photoElement = document.createElement('img');
    photoElement.alt = window.data.PhotoPreviewElement.ALT;
    photoElement.style.width = window.data.PhotoPreviewElement.WIDTH;
    photoElement.style.height = window.data.PhotoPreviewElement.HEIGHT;

    return photoElement;
  };

  var avatarChooseHandler = function () {
    imageLoader(avatarChooser, avatarPreviewBlock);
  };

  var photoChooseHandler = function () {
    var photoPreview = createPhotoPreview();
    photoPreviewBlock.appendChild(photoPreview);

    imageLoader(photoChooser, photoPreview);
  };

  var clearPictureInput = function () {
    avatarPreviewBlock.src = avatarDefaultPicture;
    photoPreviewBlock.innerHTML = '';
  };

  window.photo = {
    avatarChooser: avatarChooser,
    photoChooser: photoChooser,
    avatarChooseHandler: avatarChooseHandler,
    photoChooseHandler: photoChooseHandler,
    clearPictureInput: clearPictureInput
  };
})();
