import Link from "next/link";

export function ListBooks(books) {

    return (
        <>
            <h1>Esto es un listado</h1>
            <div>
                {books.books.map((book) => {
                    return <li key={book.id}>
                        <Link href={"books/" + book.id}>{book.volumeInfo.title}</Link>
                    </li>
                })}
            </div>

        </>
    )
}