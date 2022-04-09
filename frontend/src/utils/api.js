class Api {
    constructor(options) {
        this._url = options.baseUrl
        this._token = options.token

    }
    _checkResponse(response) {
        if (response.ok) {
            return response.json();

        }

        return Promise.reject(`something goes wrong: ${response.status} ${response.statusText}`);


    }




    async getInitialCards(token) {

        const response = await fetch(`${this._url}/cards`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return this._checkResponse(response)





    }


    async getUserData(token) {
        const response = await fetch(`${this._url}/users/me`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        return this._checkResponse(response)

    }
    async uploadCard(name, link, token) {

        const response = await fetch(`${this._url}/cards`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })

        return this._checkResponse(response)

    }
    async updatingProfileInfo(name, about, token) {
        const response = await fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })

        return this._checkResponse(response)
    }
    async updatingProfileImg(link, token) {
        const response = await fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avatar: link

            })
        })

        return this._checkResponse(response)
    }

    async deleteCard(cardId, token) {

        const response = await fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`,

            }
        })

        return this._checkResponse(response)

    }
    async likeCard(cardId, token) {

        const response = await fetch(`${this._url}/cards/${cardId}/likes/`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })

        return this._checkResponse(response)


    }
    async removeLikeCard(cardId, token) {
        const response = await fetch(`${this._url}/cards/${cardId}/likes/`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },

        })

        return this._checkResponse(response)
    }
    async changeLikeCardStatus(cardId, isLiked, token) {
        if (isLiked) {
            const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
                method: "PUT",
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })


            return this._checkResponse(response)
        }
        else {
            const response = await fetch(`${this._url}/cards/${cardId}/likes/`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },

            })

            return this._checkResponse(response)
        }



    }

}

export default new Api({
    baseUrl: "https://api.spartan.students.nomoreparties.sbs",


});










