"use client"

import consume from "@/app/core/consumer";
import { bookQueries, queryConsumer } from "@/app/core/queries";
import { useEffect, useState } from "react"

export default function HomePage() {
    const [book, setBook] = useState()

    setTimeout(() => {
        const id = window.location.href.split("/")[4];
        if (!book) {
            fetch(id);
        }
    }, 0);

    const fetch = async (id) => {
        setBook(await consume(queryConsumer.apiBook, bookQueries.getBook, id))
    }

    return (
        <>
            <div>
                {book?.id
                    ? <>
                        <h1>{book.volumeInfo.title}</h1>
                        <h2>{book.volumeInfo.authors}</h2>
                        <span>{book.volumeInfo.industryIdentifiers[0].identifier}</span><br />
                        <span>{book.volumeInfo.description}</span>
                    </>
                    : <></>
                }
                <br />
                <br />
                <select name="" id="">
                    <option value="Reading">Reading</option>
                    <option value="Plan to read">Plan to read</option>
                    <option value="Completed">Completed</option>
                </select>

            </div>

        </>
    )
}