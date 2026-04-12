import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

function App(props) {
  const { onOpenPopup, onClosePopup, popup, cards, onCardLike, onCardDelete, onAddPlaceSubmit } = props || {};

  return (
    <div className="page__content">
      <Header />
      <Main onOpenPopup={onOpenPopup} onClosePopup={onClosePopup} popup={popup} cards={cards} onCardLike={onCardLike} onCardDelete={onCardDelete} onAddPlaceSubmit={onAddPlaceSubmit} />
      <Footer />
    </div>
  )
}

export default App
