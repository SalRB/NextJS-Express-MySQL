"use client"

import { useState } from "react";
import { ListBooks } from "../components/ListBooks";
import consume from "../core/consumer";
import { bookQueries, queryConsumer } from "../core/queries";

export default function HomePage() {

    const [books, setbooks] = useState();
    const [oldparams, setoldparams] = useState(null);

    const fetch = async (params) => {
        setbooks(await consume(queryConsumer.apiBook, bookQueries.searchBooks, { query: params.q }));
    }

    setTimeout(() => {
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        })

        if ((params.q != oldparams?.q || oldparams == null) && params?.q) {
            console.log('a');
            setoldparams(params);
            fetch(params);
        }

    }, 0); // No tiene sentido pero provoca que se cargue de forma asincrona con el menor retraso posible  

    return (
        <>
            {books?.items
                ? <ListBooks books={books.items} />
                : <>There are no results matching the search criteria.</>
            }
        </>
    )
}