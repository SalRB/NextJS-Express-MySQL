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
    getOne: async (id) => {
        const result = await Api({
            url: secret.GOOGLE_API_URL + `/volumes/${id}`,
            method: "get",
        })
        return result;
    },
    search: async (data) => {
        let advancedTerms = "";
        if (data.author)
            advancedTerms = `${advancedTerms}+inauthor:${data.author}`
        if (data.isbn)
            advancedTerms = `${advancedTerms}+isbn:${data.isbn}`

        const result = await Api({
            url: secret.GOOGLE_API_URL + `/volumes?q=${data.query}${advancedTerms}&maxResults=10&startIndex=0`,
            method: "get",
        })
        return result;
    },
}

export default bookConsumer;