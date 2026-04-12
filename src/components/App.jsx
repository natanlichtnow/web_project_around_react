import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App(props) {
  const { onOpenPopup, onClosePopup, popup, cards, onCardLike, onCardDelete, onAddPlaceSubmit, currentUser, handleUpdateUser, handleUpdateAvatar } = props || {};

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}>
      <div className="page__content">
        <Header />
        <Main onOpenPopup={onOpenPopup} onClosePopup={onClosePopup} popup={popup} cards={cards} onCardLike={onCardLike} onCardDelete={onCardDelete} onAddPlaceSubmit={onAddPlaceSubmit} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
