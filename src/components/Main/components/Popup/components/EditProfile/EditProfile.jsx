export default function EditProfile() {
  return (
    <form className="popup__form" id="edit-profile-form">
      <input
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Nome"
        type="text"
        minLength="2"
        maxLength="40"
      />
      <input
        className="popup__input popup__input_type_description"
        name="description"
        placeholder="Sobre mim"
        type="text"
        minLength="2"
        maxLength="200"
      />
      <button className="button popup__button" type="submit" disabled>Salvar</button>
    </form>
  );
}