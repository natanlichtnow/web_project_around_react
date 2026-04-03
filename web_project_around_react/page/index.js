import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForms } from "../components/PopupWithForms.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import { Api } from "../components/Api.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__avatar-edit-button");
const editProfileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const editAvatarForm = document.querySelector("#edit-avatar-form");

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "9ba0b934-682f-4473-a788-94b2f44b2896",
    "Content-Type": "application/json"
  }
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image"
});

const popupWithImage = new PopupWithImage("#image-popup");
popupWithImage.setEventListeners();

const cardsSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      cardsSection.appendItem(createCard(cardData));
    }
  },
  ".cards__list"
);

const editProfilePopup = new PopupWithForms("#edit-popup", (formData) => {
  editProfilePopup.renderLoading(true);

  api
    .updateUserInfo({
      name: formData.name,
      about: formData.description
    })
    .then((updatedUserData) => {
      userInfo.setUserInfo(updatedUserData);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForms("#new-card-popup", (formData) => {
  addCardPopup.renderLoading(true);

  api
    .addCard({
      name: formData["place-name"],
      link: formData["image-link"]
    })
    .then((newCardData) => {
      cardsSection.addItem(createCard(newCardData));
      addCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
});
addCardPopup.setEventListeners();

const editAvatarPopup = new PopupWithForms("#edit-avatar-popup", (formData) => {
  editAvatarPopup.renderLoading(true);

  api
    .updateAvatar({
      avatar: formData.avatar
    })
    .then((updatedUserData) => {
      userInfo.setUserInfo(updatedUserData);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editAvatarPopup.renderLoading(false);
    });
});
editAvatarPopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation("#delete-card-popup");
deleteCardPopup.setEventListeners();

function createCard(cardData) {
  const card = new Card({
    data: cardData,
    userId: userInfo.getUserId(),
    handleCardClick: (data) => {
      popupWithImage.open(data);
    },
    handleDeleteClick: (cardInstance) => {
      deleteCardPopup.setSubmitAction(() => {
        api
          .deleteCard(cardInstance.getId())
          .then(() => {
            cardInstance.removeCard();
            deleteCardPopup.close();
          })
          .catch((err) => {
            console.error(err);
          });
      });

      deleteCardPopup.open();
    },
    handleLikeClick: (cardInstance) => {
      const likeRequest = cardInstance.isLiked()
        ? api.removeLike(cardInstance.getId())
        : api.addLike(cardInstance.getId());

      likeRequest
        .then((updatedCardData) => {
          cardInstance.setLikes(updatedCardData);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });

  return card.getCardElement();
}

const validators = {
  profile: new FormValidator(
    {
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled"
    },
    editProfileForm
  ),
  card: new FormValidator(
    {
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled"
    },
    newCardForm
  ),
  avatar: new FormValidator(
    {
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled"
    },
    editAvatarForm
  )
};

Object.values(validators).forEach((validator) => validator.setEventListeners());

profileEditButton.addEventListener("click", () => {
  const currentInfo = userInfo.getUserInfo();

  editProfilePopup.setInputValues({
    name: currentInfo.name,
    description: currentInfo.about
  });
  validators.profile.resetValidation();
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  validators.card.resetValidation();
  addCardPopup.open();
});

avatarEditButton.addEventListener("click", () => {
  editAvatarPopup.setInputValues({ avatar: userInfo.getUserInfo().avatar });
  validators.avatar.resetValidation();
  editAvatarPopup.open();
});

api
  .getAppInfo()
  .then(([profileData, cardList]) => {
    userInfo.setUserInfo(profileData);
    cardsSection.items = cardList;
    cardsSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });