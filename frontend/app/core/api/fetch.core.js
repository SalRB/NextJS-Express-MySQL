const Api = async ({ url, method, body, token = "" }) => {

    // fetch("https://www.googleapis.com/books/v1/volumes?q=a&maxResults=10&startIndex=0", {

    try {
        const data = await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })

        return data.json();
    } catch (e) {
        console.log(e);
    }
};

export default Api;