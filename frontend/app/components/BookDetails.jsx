import { useState } from "react";
import { BookForm } from "./BookForm";
import Link from "next/link";

export function BookDetails({ book, formData, session, updateUserEntry, deleteEntry, updateFavorite, createEntry }) {

    return (
        <>
            <div className="imageContainer">
                <img src={book.volumeInfo.imageLinks?.thumbnail ?? "/unavailableImage2.jpeg"} alt="" />
            </div>
            <div className="bookTitle">
                <span>{book.volumeInfo.title}</span>
            </div>
            <div className="bookAuthors">
                <span>{book.volumeInfo.authors}</span>
            </div>
            <div className="bookPages">
                <span>{book.volumeInfo.pageCount} pages</span>
            </div>
            <div className="bookSynopsis">
                <div>{book.volumeInfo.description ?? "No synopsis provided"}</div>
            </div>

            <div className="bookFormContainer">
                {
                    formData?.length >= 1
                        ? <BookForm formData={formData[0]} updateUserEntry={updateUserEntry} deleteEntry={deleteEntry} updateFavorite={updateFavorite} bookInfo={book} />
                        : session?.user
                            ? <span className="addBook" onClick={() => { createEntry() }}>Add</span>
                            : <span className="loginAlert"><Link href="/login">Login to be able of registering books</Link></span>
                }
            </div>
        </>
    )
}