"use client"

import { useRouter } from "next/navigation";

export function AdvancedSearch({ links }) {
    const router = useRouter();

    async function search(event) {
        event.preventDefault();
        let advancedTerms = "";
        if (document.querySelector('#author').value)
            advancedTerms = `${advancedTerms}&author=${document.querySelector('#author').value}`
        if (document.querySelector('#isbn').value)
            advancedTerms = `${advancedTerms}&isbn=${document.querySelector('#isbn').value}`

        let route = `/search?q=${document.querySelector('#title').value}`

        if (advancedTerms)
            route = `${route}${advancedTerms}`

        router.push(route);
    }

    return (
        <form onSubmit={(event) => search(event)}>
            <label htmlFor="title">Title </label>
            <input type="text" placeholder="title" id="title" name="title" />
            <label htmlFor="author">Author </label>
            <input type="text" placeholder="author" id="author" name="author" />
            <label htmlFor="isbn">ISBN </label>
            <input type="text" placeholder="ISBN" id="isbn" name="isbn" />
            <button type="submit">Search</button>
        </form>
    )
}