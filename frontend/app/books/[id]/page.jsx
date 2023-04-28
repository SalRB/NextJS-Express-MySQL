"use client"

import { BookForm } from "@/app/components/BookForm";
import { Comments } from "@/app/components/Comments";
import consume from "@/app/core/consumer";
import { bookQueries, bookshelfQueries, commentQueries, queryConsumer } from "@/app/core/queries";
import { useSession } from "next-auth/react";
import { useState } from "react"

export default function HomePage() {
    const [book, setBook] = useState();
    const [formData, setFormData] = useState();
    const [comments, setComments] = useState();
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
        setComments(await consume(queryConsumer.apiComment, commentQueries.getComments, id));
        if (session) {
            setFormData(await consume(queryConsumer.apiBookshelf, bookshelfQueries.getBookEntryData, { token: session.user.token, book: id }));
        }
    }

    const updateUserEntry = async (data) => {
        await consume(queryConsumer.apiBookshelf, bookshelfQueries.updateEntry, { token: session.user.token, book: id, data });
    }

    const createEntry = async () => {
        const data = {
            token: session.user.token,
            book: {
                id: book.id,
                title: book.volumeInfo.title,
                pages: book.volumeInfo.pageCount,
                image: book.volumeInfo.imageLinks.thumbnail
            }
        };
        const res = await consume(queryConsumer.apiBookshelf, bookshelfQueries.createEntry, data);
        console.log(res[2]);
        setFormData(res[2]);
    }

    const deleteEntry = async () => {
        const res = await consume(queryConsumer.apiBookshelf, bookshelfQueries.deleteEntry, data);
        setFormData(null);
    }

    const createComment = async (content) => {
        await consume(queryConsumer.apiComment, commentQueries.createComment, { token: session.user.token, data: { book: id, content: content } });
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
                    formData?.length >= 1
                        ? <BookForm formData={formData[0]} updateUserEntry={updateUserEntry} deleteEntry={deleteEntry} />
                        : session?.user
                            ? <span onClick={() => { createEntry() }}>Add</span>
                            : <span>Login to be able of registering books</span>
                }

                <Comments comments={comments} createComment={createComment} session={session} />
            </div>

        </>
    )
}