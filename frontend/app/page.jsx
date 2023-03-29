"use client"

import { useState } from "react"

export default function HomePage() {
    const [books, setBooks] = useState([])

    // fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms")
    //     .then(res => res.json())
    //     .then(data => {
    //         setBooks(data)
    //         console.log(data);
    //     })

    return (
        <>
            <h1>Esto es el home</h1>


        </>
    )
}