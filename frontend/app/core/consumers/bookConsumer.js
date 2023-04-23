import Api from "../api/fetch.core";
import secret from "../../../secret";

const bookConsumer = {
    get: async () => {
        const result = await Api({
            url: secret.GOOGLE_API_URL + "/volumes?q=a&maxResults=10&startIndex=0",
            method: "get",
        })
        // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        // console.log(result.json());
        return result;

    },
}

export default bookConsumer;