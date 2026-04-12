class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(path, options = {}) {
    return fetch(`${this._baseUrl}${path}`, {
      headers: this._headers,
      ...options,
    }).then((res) => this._checkResponse(res));
  }

  getUserInfo() {
    return this._request('/users/me');
  }

  getInitialCards() {
    return this._request('/cards/');
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  updateUserInfo({ name, about }) {
    return this._request('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
    });
  }

  addCard({ name, link }) {
    return this._request('/cards/', {
      method: 'POST',
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
    });
  }

  addLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
    });
  }

  removeLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
    });
  }

  changeLikeCardStatus(cardId, like) {
    return like ? this.addLike(cardId) : this.removeLike(cardId);
  }

  updateAvatar({ avatar }) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({ avatar }),
    });
  }
}

const api = new Api({
  baseUrl: 'https://around-api.pt-br.tripleten-services.com/v1',
  headers: {
    authorization: '9ba0b934-682f-4473-a788-94b2f44b2896',
    'Content-Type': 'application/json',
  },
});

export default api;
