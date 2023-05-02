import Api from "../api/fetch.core";
import secret from "../../../secret";

const userConsumer = {
    test: async (data) => {
        const result = await Api({
            url: secret.EXPRESS_APP_URL + "/favorite",
            method: "post",
            body: {
                "book": "suydiuhaoij",
                "favorited": true
            },
            token: data.token
        })
        return result;
    },
    register: async (data) => {
        const result = await Api({
            url: secret.EXPRESS_APP_URL + "/user/register",
            method: "post",
            body: data
        })
        return result;
    },
    login: async (data) => {
        const result = await Api({
            url: secret.EXPRESS_APP_URL + "/user/login",
            method: "post",
            body: data
        })
        return result;
    },
    get: async (id) => {
        const result = await Api({
            url: secret.EXPRESS_APP_URL + `/user/${id}`,
            method: "get",
        })
        return result;
    },
}

export default userConsumer;