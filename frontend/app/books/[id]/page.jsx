"use client"

import { BookForm } from "@/app/components/BookForm";
import consume from "@/app/core/consumer";
import { bookQueries, bookshelfQueries, queryConsumer } from "@/app/core/queries";
import { useSession } from "next-auth/react";
import { useState } from "react"

export default function HomePage() {
    const [book, setBook] = useState();
    const [formData, setFormData] = useState();
    const { data: session } = useSession();
    let id;

    setTimeout(() => {
        id = window.location.href.split("/")[4];
        if (!book) {
            fetch(id);
        }
    }, 0);

    const fetch = async () => {
        setBook(await consume(queryConsumer.apiBook, bookQueries.getBook, id));
        if (session) {
            setFormData(await consume(queryConsumer.apiBookshelf, bookshelfQueries.getBookEntryData, { token: session.user.token, book: id }));
        }
    }

    const updateUserEntry = async (data) => {
        console.log({ token: session.user.token, book: id, data });
        const juan = await consume(queryConsumer.apiBookshelf, bookshelfQueries.updateEntry, { token: session.user.token, book: id, data });
        console.log(juan);
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
                {
                    formData != undefined
                        ? <BookForm formData={formData[0]} updateUserEntry={updateUserEntry} />
                        : <></>
                }
            </div>

        </>
    )
}