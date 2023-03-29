"use client"

import { useEffect, useState } from "react"

export default function HomePage() {
    const [book, setBook] = useState()

    const id = window.location.href.split("/")[4];

    useEffect(() => {
        fetch("https://www.googleapis.com/books/v1/volumes/" + id)
            .then(res => res.json())
            .then(data => {
                setBook(data);
            })
    }, [id])

    return (
        <>
            <div>
                {book
                    ? !book.error
                        ? <>
                            <h1>{book.volumeInfo.title}</h1>
                            <h2>{book.volumeInfo.authors}</h2>
                            <span>{book.volumeInfo.industryIdentifiers[0].identifier}</span><br/>
                            <span>{book.volumeInfo.description}</span>
                        </>
                        : <></>
                    : <></>
                }
            </div>

        </>
    )
}