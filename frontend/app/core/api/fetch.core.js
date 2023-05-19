const Api = async ({ url, method, body, token = "" }) => {

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