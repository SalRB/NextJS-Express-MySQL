"use client"

import { useState } from "react";
import { ListBooks } from "../components/ListBooks";
import consume from "../core/consumer";
import { bookQueries, queryConsumer } from "../core/queries";
import { AdvancedSearch } from "../components/search/AdvancedSearch";

export default function HomePage() {

    const [books, setbooks] = useState();
    const [oldparams, setoldparams] = useState(null); // Habilita poder buscar desde la página de busqueda

    const fetch = async (params) => {
        setbooks(await consume(queryConsumer.apiBook, bookQueries.searchBooks, { query: params.q, author: params.author, isbn: params.isbn }));
    }

    setTimeout(() => {
        try {
            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            })
            if (((params.q != oldparams?.q || params.author != oldparams?.author || params.isbn != oldparams?.isbn) || oldparams == null) && (params?.q || params?.author || params?.isbn)) {
                setoldparams(params);
                fetch(params);
            }
        } catch (e) { }

    }, 0); // No tiene sentido pero provoca que se cargue de forma asincrona con el menor retraso posible  

    return (
        <>
            <AdvancedSearch />
            {books?.items
                ? <ListBooks books={books.items} />
                : <>There are no results matching the search criteria.</>
            }
        </>
    )
}