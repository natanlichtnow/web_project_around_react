export default function EditAvatar() {
  return (
    <form className="popup__form" id="edit-avatar-form">
      <input
        className="popup__input popup__input_type_avatar"
        name="avatar"
        placeholder="Link da imagem"
        required
        type="url"
      />
      <button className="button popup__button" type="submit" disabled>Salvar</button>
    </form>
  );
}