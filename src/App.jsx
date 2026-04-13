import React, { useState, useEffect } from "react";
import api from "./utils/api";
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
    if (!currentUser) return;
    const isLiked = Array.isArray(card.likes) && card.likes.some((u) => u._id === currentUser._id);
    try {
      let newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      // Se o backend não retornar o campo likes, preserva o antigo ou cria um array
      if (!newCard.likes) {
        const oldLikes = Array.isArray(card.likes) ? card.likes : [];
        newCard = { ...newCard, likes: isLiked
          ? oldLikes.filter((u) => u._id !== currentUser._id)
          : [...oldLikes, { _id: currentUser._id }] };
      }
      setCards((state) => {
        const updated = state.map((c) => (c._id === card._id ? newCard : c));
        console.log('Like atualizado:', newCard, updated);
        return updated;
      });
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
    <AppLayout
      onOpenPopup={handleOpenPopup}
      onClosePopup={handleClosePopup}
      popup={popup}
      cards={cards}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
      onAddPlaceSubmit={handleAddPlaceSubmit}
      currentUser={currentUser}
      handleUpdateUser={handleUpdateUser}
      handleUpdateAvatar={handleUpdateAvatar}
    />
  );
}

export default App;
