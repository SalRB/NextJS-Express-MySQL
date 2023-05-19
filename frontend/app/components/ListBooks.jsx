import Link from "next/link";

export function ListBooks(books) {
    return (
        <>
            <div className="searchResultContainer">
                {books.books.map((book) => {
                    console.log(book);
                    return <div key={book.id} className="searchResultCard">
                        <div className="cardImageContainer">
                            <img src={book.volumeInfo.imageLinks?.thumbnail ?? "unavailableImage2.jpeg"} alt="" />
                        </div>
                        <div className="bookTitle">
                            <Link href={"books/" + book.id}>{book.volumeInfo.title}</Link>
                        </div>
                        <div className="bookPages">
                            <span>{book.volumeInfo.pageCount} p</span>
                        </div>
                        <div className="bookSynopsis">
                            <span>{book.volumeInfo.description ?? "No synopsis provided"}</span>
                        </div>
                    </div>
                })}
            </div>

        </>
    )
}