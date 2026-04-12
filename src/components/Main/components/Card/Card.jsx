import { useContext } from "react";
import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";
import RemoveCard from "../Popup/components/RemoveCard/RemoveCard";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card(props) {
  const { card, onCardClick, onCardDelete, onCardLike } = props;
  const { name, link, isLiked } = card;
  const { currentUser } = useContext(CurrentUserContext);

  const cardLikeButtonClassName = `card__like-button ${isLiked ? 'card__like-button_is-active' : ''}`;

  function handleLikeClick() {
    if (onCardLike) onCardLike(card);
  }

  function handleDeleteClick() {
    if (onCardDelete) onCardDelete(card);
  }

  return (
    <li className="card">
      <img className="card__image" src={link} alt={name} onClick={() => onCardClick({ children: <ImagePopup card={card} /> })} />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      />
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