import { useContext } from "react";
import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";
import RemoveCard from "../Popup/components/RemoveCard/RemoveCard";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card(props) {
  const { card, onCardClick, onCardDelete, onCardLike, onClosePopup } = props;
  const { name, link } = card;
  const { currentUser } = useContext(CurrentUserContext);


  // Log para depuração
  console.log('Card render', card._id, 'likes:', card.likes, 'isLiked:', Array.isArray(card.likes) && currentUser ? card.likes.some((u) => u._id === currentUser._id) : false);

  const isLiked = Array.isArray(card.likes) && currentUser ? card.likes.some((u) => u._id === currentUser._id) : false;
  const isOwn = currentUser ? (card.owner && (card.owner._id ? card.owner._id === currentUser._id : card.owner === currentUser._id)) : false;
  const cardLikeButtonClassName = `card__like-button ${isLiked ? 'card__like-button_is-active' : ''}`;

  function handleLikeClick() {
    if (onCardLike) onCardLike(card);
  }

  function handleDeleteClick() {
    if (onCardClick) {
      onCardClick({ title: 'Tem certeza?', children: <RemoveCard onConfirm={() => { if (onCardDelete) onCardDelete(card); if (onClosePopup) onClosePopup(); }} /> });
    }
  }

  return (
    <li className="card">
      <img className="card__image" src={link} alt={name} onClick={() => onCardClick({ children: <ImagePopup card={card} /> })} />
      {isOwn && (
        <button
          aria-label="Delete card"
          className="card__delete-button"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}