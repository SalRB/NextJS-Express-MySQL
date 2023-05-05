import Api from "../api/fetch.core";
import secret from "../../../secret";

const objectiveConsumer = {
    get: async (data) => {
        const result = await Api({
            url: secret.EXPRESS_APP_URL + `/objective/${data}`,
            method: "get",
        })
        return result;
    },
    create: async (data) => {
        const result = await Api({
            url: secret.EXPRESS_APP_URL + `/objective`,
            method: "post",
            body: data.data,
            token: data.token
        })
        return result;
    },
}

export default objectiveConsumer;