class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }
  
    getInitialCards() {
      return fetch(`${this.baseUrl}/cards`, {
        headers: this.headers
      })
        .then(this._getServerResponse);
    }

    _getServerResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Не удалось получить ответ от сервера. Ошибка ${res.status}`);
    }

    deleteCard(id) {
      return fetch(`${this.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this.headers
      })
        .then(this._getServerResponse);
    }

    editProfile(item) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: item.name,
          about: item.about
        })
      })
      .then(this._getServerResponse);
    }


    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
          headers: this.headers
        })
          .then(this._getServerResponse);
      
    }

    addCard(card) {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: card.title,
          link: card.image
        })
      })
      .then(this._getServerResponse);
    }

    editAvatar(data) {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: data.avatar,
        })
      })
        .then(this._getServerResponse);
    }

    deleteLike(cardId) {
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this.headers
      })
        .then(this._getServerResponse);
    }

    addLike(cardId) {
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this.headers
      })
        .then(this._getServerResponse);
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (!isLiked) {
          return this.deleteLike(cardId);
        } else {
          return this.addLike(cardId);
        }
      }
  }
  
  

const api = new Api({
    baseUrl: 'http://renat-frontend.tk',
    headers: {
      authorization: "607af2b55075f80d4c2d0314",
      'Content-Type': 'application/json'
    }
  });

  export default api