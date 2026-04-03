import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";
import RemoveCard from "../Popup/components/RemoveCard/RemoveCard";

export default function Card(props) {
  const { card, onCardClick, onDeleteClick } = props;
  const { name, link, isLiked } = card;
  return (
    <li className="card">
      <img className="card__image" src={link} alt={name} onClick={() => onCardClick({ children: <ImagePopup card={card} /> })} />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={() => onDeleteClick({ title: "Delete card", children: <RemoveCard /> })}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className="card__like-button"
        />
      </div>
    </li>
  );
}