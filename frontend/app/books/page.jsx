"use client"

import { useState } from "react"
import { ListBooks } from "../components/ListBooks";

export default function HomePage() {
    const [books, setBooks] = useState()

    if (!books) {
        fetch("https://www.googleapis.com/books/v1/volumes?q=a&maxResults=10&startIndex=0")
            .then(res => res.json())
            .then(data => {
                setBooks(data);
            })
    }

    return (
        <>
            {books
                ? <ListBooks books={books.items} />
                : <></>
            }
        </>
    )
}