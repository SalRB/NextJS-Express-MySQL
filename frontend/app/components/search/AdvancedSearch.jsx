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
        <div className="advancedSearchContainer">
            <form onSubmit={(event) => search(event)}>
                <div className="advencedSearchTitle">
                    <span className="titleText">Advanced search</span>
                </div>
                <div className="title">
                    <label className="inputLabel" htmlFor="title">Title </label>
                    <input className="advancedSearchInput" type="text" placeholder="title" id="title" name="title" />
                </div>
                <div className="author">
                    <label className="inputLabel" htmlFor="author">Author </label>
                    <input className="advancedSearchInput" type="text" placeholder="author" id="author" name="author" />
                </div>
                <div className="isbn">
                    <label className="inputLabel" htmlFor="isbn">ISBN </label>
                    <input className="advancedSearchInput" type="text" placeholder="ISBN" id="isbn" name="isbn" />
                </div>
                <div className="buttonDiv">
                    <button className="button" type="submit">Search</button>
                </div>
            </form>
        </div>
    )
}