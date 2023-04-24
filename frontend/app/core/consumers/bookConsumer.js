import Api from "../api/fetch.core";
import secret from "../../../secret";

const bookConsumer = {
    get: async () => {
        const result = await Api({
            url: secret.GOOGLE_API_URL + "/volumes?q=a&maxResults=10&startIndex=0",
            method: "get",
        })
        return result;
    },
    search: async (data) => {
        const result = await Api({
            url: secret.GOOGLE_API_URL + `/volumes?q=${data.query}&maxResults=10&startIndex=0`,
            method: "get",
        })
        return result;
    },
}

export default bookConsumer;