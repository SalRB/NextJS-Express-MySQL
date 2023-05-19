import Link from "next/link";

export function ListBooksProfile({ listData, activeView }) {
    return (
        <>
            {listData.map((book) => {
                return <div className="listBooks" key={book.id ?? book.book_id}>
                    <div className="img">
                        <img src={book.image ?? "/unavailableImage2.jpeg"} alt="" />
                    </div>
                    <div className="title">
                        <Link href={"books/" + book.id}>{book.title}</Link>
                    </div>
                    <div className="data">
                        {
                            activeView == "bookshelf"
                                ? <>
                                    <div>{book.state_name}</div>
                                    <div>Progress: {book.progress}/{book.pages}</div>
                                    <div>Review: {book.review ?? "Not valued yet"}</div>
                                </>
                                : <></>
                        }
                    </div>
                </div>
            })}
        </>
    )
}