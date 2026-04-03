import { useState } from 'react'
import reactLogo from 'assets/react.svg'
import viteLogo from 'assets/vite.svg'
import heroImgpm from 'assets/hero.png'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <div class="page__content">
      <header class="header page__section">
        <img
          alt="Logotipo Around The U.S."
          class="logo header__logo"
          src="./images/logo.svg"
        />
      </header>
      <main class="content">
        <section class="profile page__section">
          <div class="profile__avatar-container">
            <img class="profile__image" src="./images/avatar.jpg" alt="Avatar" />
            <button
              aria-label="Editar foto de perfil"
              class="profile__avatar-edit-button"
              type="button"
            ></button>
          </div>
          <div class="profile__info">
            <h1 class="profile__title">Jacques Cousteau</h1>
            <button
              aria-label="Editar perfil"
              class="profile__edit-button"
              type="button"
            ></button>
            <p class="profile__description">Explorador</p>
          </div>
          <button
            aria-label="Adicionar cartão"
            class="profile__add-button"
            type="button"
          ></button>
        </section>
        <section class="cards page__section">
          <ul class="cards__list">
            
          </ul>
        </section>
      </main>
      <footer class="footer page__section">
        <p class="footer__copyright">© 2025 Around The U.S.</p>
      </footer>
      <div class="popup" id="edit-popup">
        <div class="popup__content">
          <button
            aria-label="Fechar pop-up"
            class="popup__close"
            type="button"
          ></button>
          <h3 class="popup__title">Editar perfil</h3>
          <form class="popup__form" id="edit-profile-form">
            <input
              class="popup__input popup__input_type_name"
              name="name"
              placeholder="Nome"
              type="text"
              minlength="2"
              maxlength="40"
            />
            <input
              class="popup__input popup__input_type_description"
              name="description"
              placeholder="Sobre mim"
              type="text"
              minlength="2"
              maxlength="200"
            />
            <button class="button popup__button" type="submit" disabled>Salvar</button>
          </form>
        </div>
      </div>
      <div class="popup" id="new-card-popup">
        <div class="popup__content">
          <button
            aria-label="Fechar pop-up"
            class="popup__close"
            type="button"
          ></button>
          <h3 class="popup__title">Novo local</h3>
          <form class="popup__form" id="new-card-form">
            <input
              class="popup__input popup__input_type_card-name"
              name="place-name"
              placeholder="Título"
              required
              type="text"
            />
            <input
              class="popup__input popup__input_type_url"
              name="image-link"
              placeholder="Link de Imagem"
              required
              type="url"
            />
            <button class="button popup__button" type="submit" disabled>Criar</button>
          </form>
        </div>
      </div>
      <div class="popup" id="image-popup">
        <div class="popup__content popup__content_content_image">
          <button
            aria-label="Fechar pop-up"
            class="popup__close"
            type="button"
          ></button>
          <img alt="Imagem ampliada" class="popup__image" src="#" />
          <p class="popup__caption"></p>
        </div>
      </div>
      <div class="popup" id="edit-avatar-popup">
        <div class="popup__content">
          <button
            aria-label="Fechar pop-up"
            class="popup__close"
            type="button"
          ></button>
          <h3 class="popup__title">Alterar foto do perfil</h3>
          <form class="popup__form" id="edit-avatar-form">
            <input
              class="popup__input popup__input_type_avatar"
              name="avatar"
              placeholder="Link da imagem"
              required
              type="url"
            />
            <button class="button popup__button" type="submit" disabled>Salvar</button>
          </form>
        </div>
      </div>
      <div class="popup" id="delete-card-popup">
        <div class="popup__content popup__content_type_confirm">
          <button
            aria-label="Fechar pop-up"
            class="popup__close"
            type="button"
          ></button>
          <h3 class="popup__title">Tem certeza?</h3>
          <form class="popup__form" id="delete-card-form">
            <button class="button popup__button" type="submit">Sim</button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
