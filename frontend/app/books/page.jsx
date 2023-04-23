// import { useState } from "react"
import { ListBooks } from "../components/ListBooks";
import consume from "../core/consumer";
import bikeConsumer from "../core/consumers/bookConsumer";
import { bookQueries, userQueries, queryConsumer } from "../core/queries";

export default async function HomePage() {
    // const [books, setBooks] = useState()

    let books;

    if (!books) {

        // fetch("https://www.googleapis.com/books/v1/volumes?q=a&maxResults=10&startIndex=0")
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log("a");
        //         console.log(data);
        //         // setBooks(data);
        //         books = data;
        //     })

        // console.log(await bikeConsumer.get());
        books = await consume(queryConsumer.apiBook, bookQueries.getBooks)

        await consume(queryConsumer.apiUser, userQueries.testUsers)

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