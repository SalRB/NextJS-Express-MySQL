import Api from "../api/fetch.core";
import secret from "../../../secret";

const commentConsumer = {
    get: async (data) => {
        const result = await Api({
            url: secret.EXPRESS_APP_URL + `/comment/${data}`,
            method: "get",
        })
        return result;
    },
    create: async (data) => {
        const result = await Api({
            url: secret.EXPRESS_APP_URL + `/comment`,
            method: "post",
            body: data.data,
            token: data.token
        })
        return result;
    },
}

export default commentConsumer;