// import { useState } from "react"
import { ListBooks } from "../components/ListBooks";
import consume from "../core/consumer";
import bikeConsumer from "../core/consumers/bookConsumer";
import { bookQueries, userQueries, queryConsumer } from "../core/queries";

export default async function HomePage() {
    // const [books, setBooks] = useState()

    let books;

    if (!books) {
        books = await consume(queryConsumer.apiBook, bookQueries.getBooks)
    }

    return (
        <>
            <span>a</span>
            {books
                ? <ListBooks books={books.items} />
                : <>kk</>
            }
        </>
    )
}