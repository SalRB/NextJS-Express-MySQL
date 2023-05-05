import Link from "next/link";

export function ListBooksProfile({ listData }) {
    // console.log(listData);
    return (
        <>
            {listData.map((book) => {
                return <div key={book.id ?? book.book_id}>
                    <Link href={"books/" + book.id}>{book.title}</Link>
                </div>
            })}
        </>
    )
}