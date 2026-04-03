import avatar from "../images/avatar.jpg";
import Header from "./Header/Header";

function App() {
  return (
    <div className="page__content">
      <Header />
      <main className="content">
        <section className="profile page__section">
          <div className="profile__avatar-container">
            <img className="profile__image" src={avatar} alt="Avatar" />
            <button
              aria-label="Editar foto de perfil"
              className="profile__avatar-edit-button"
              type="button"
            ></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">Jacques Cousteau</h1>
            <button
              aria-label="Editar perfil"
              className="profile__edit-button"
              type="button"
            ></button>
            <p className="profile__description">Explorador</p>
          </div>
          <button
            aria-label="Adicionar cartão"
            className="profile__add-button"
            type="button"
          ></button>
        </section>
        <section className="cards page__section">
          <ul className="cards__list">
            
          </ul>
        </section>
      </main>
      <footer className="footer page__section">
        <p className="footer__copyright">© 2025 Around The U.S.</p>
      </footer>
    </div>
  )
}

export default App
