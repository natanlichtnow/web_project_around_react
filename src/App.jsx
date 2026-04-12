import React, { useState, useEffect } from "react";
import api from "./utils/api";
import CurrentUserContext from "./contexts/CurrentUserContext";
import AppLayout from "./components/App";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((data) => setCurrentUser(data))
      .catch((err) => console.error("Erro ao buscar dados do usuário:", err));
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then((data) => setCards(data))
      .catch((err) => console.error("Erro ao buscar cards:", err));
  }, []);

  const handleOpenPopup = (p) => setPopup(p);
  const handleClosePopup = () => setPopup(null);

  const handleUpdateUser = (data) => {
    api.updateUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => console.error("Erro ao atualizar usuário:", err));
  };

  const handleUpdateAvatar = (data) => {
    api.updateAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => console.error("Erro ao atualizar avatar:", err));
  };

  async function handleCardLike(card) {
    try {
      const newCard = await api.changeLikeCardStatus(card._id, !card.isLiked);
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (err) {
      console.error('Erro ao curtir/descurtir card:', err);
    }
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (err) {
      console.error('Erro ao deletar card:', err);
    }
  }

  const handleAddPlaceSubmit = (data) => {
    api.addCard(data)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        handleClosePopup();
      })
      .catch((err) => console.error('Erro ao adicionar card:', err));
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}>
      <AppLayout
        onOpenPopup={handleOpenPopup}
        onClosePopup={handleClosePopup}
        popup={popup}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        onAddPlaceSubmit={handleAddPlaceSubmit}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
