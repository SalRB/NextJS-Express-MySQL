"use client"

import { BookDetails } from "@/app/components/BookDetails";
import { BookForm } from "@/app/components/BookForm";
import { Comments } from "@/app/components/Comments";
import consume from "@/app/core/consumer";
import { bookQueries, bookshelfQueries, commentQueries, queryConsumer } from "@/app/core/queries";
import { useSession } from "next-auth/react";
import { useState } from "react"
import { toast } from 'react-toastify';

export default function HomePage() {
    const [book, setBook] = useState();
    const [formData, setFormData] = useState();
    const [comments, setComments] = useState();
    const { data: session } = useSession();
    let id;

    setTimeout(() => {
        id = window.location.href.split("/")[4];
        if (!book) {
            fetch();
        }
    }, 10);

    const fetch = async () => {
        setBook(await consume(queryConsumer.apiBook, bookQueries.getBook, id));
        setComments(await consume(queryConsumer.apiComment, commentQueries.getComments, id));
        if (session) {
            setFormData(await consume(queryConsumer.apiBookshelf, bookshelfQueries.getBookEntryData, { token: session.user.token, book: id }));
        }
    }

    const updateUserEntry = async (data) => {
        await consume(queryConsumer.apiBookshelf, bookshelfQueries.updateEntry, { token: session.user.token, book: id, data });
        toast.success("Entry updated!", { theme: "dark" })
    }

    const updateFavorite = async (bookId, fav) => {
        await consume(queryConsumer.apiBookshelf, bookshelfQueries.toggleFavorite, { token: session.user.token, data: { book: bookId, favorited: fav } });
        toast.success("Entry updated!", { theme: "dark" })
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
        const res = await consume(queryConsumer.apiBookshelf, bookshelfQueries.deleteEntry, { token: session.user.token, book: id });
        setFormData(null);
        toast.success("Entry deleted!", { theme: "dark" })
    }

    const createComment = async (content) => {
        await consume(queryConsumer.apiComment, commentQueries.createComment, { token: session.user.token, data: { book: id, content: content } });
        toast.success("Comment published!", { theme: "dark" })
    }

    return (
        <>
            <div className="detailsPageContainer">
                {book?.id
                    ? <BookDetails book={book} formData={formData} session={session} updateUserEntry={updateUserEntry} deleteEntry={deleteEntry} updateFavorite={updateFavorite} createEntry={createEntry} />
                    : <>Loading...</>
                }
            </div>
            <Comments comments={comments} createComment={createComment} session={session} />
        </>
    )
}