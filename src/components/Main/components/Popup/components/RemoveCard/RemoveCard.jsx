export default function RemoveCard() {
  return (
    <>
      <h3 className="popup__title">Tem certeza?</h3>
      <form className="popup__form" id="delete-card-form">
        <button className="button popup__button" type="submit">Sim</button>
      </form>
    </>
  );
}