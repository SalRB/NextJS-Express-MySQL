import Api from "../api/fetch.core";
import secret from "../../../secret";

const bookshelfConsumer = {
    getEntry: async (data) => {
        const result = await Api({
            url: secret.EXPRESS_APP_URL + `/bookshelf/book/${data.book}`,
            method: "get",
            token: data.token,
        })
        return result;
    },
    update: async (data) => {
        const result = await Api({
            url: secret.EXPRESS_APP_URL + `/bookshelf/${data.book}`,
            method: "put",
            body: data.data,
            token: data.token,
        })
        return result;
    },
    create: async (data) => {
        const result = await Api({
            url: secret.EXPRESS_APP_URL + `/bookshelf`,
            method: "post",
            body: data.book,
            token: data.token,
        })
        return result;
    },
    delete: async (data) => {
        const result = await Api({
            url: secret.EXPRESS_APP_URL + `/bookshelf/${data.book}`,
            method: "delete",
            token: data.token,
        })
        return result;
    },
    userEntries: async (data) => {
        const result = await Api({
            url: secret.EXPRESS_APP_URL + `/bookshelf/${data.user}`,
            method: "post",
            body: data.data,
        })
        return result;
    },
    userFavorites: async (data) => {
        const result = await Api({
            url: secret.EXPRESS_APP_URL + `/bookshelf/user/favorite/${data}`,
            method: "get",
        })
        return result;
    },
    toggleFavorite: async (data) => {
        const result = await Api({
            url: secret.EXPRESS_APP_URL + `/bookshelf/user/favorite`,
            method: "post",
            body: data.data,
            token: data.token,
        })
        return result;
    },
}

export default bookshelfConsumer;