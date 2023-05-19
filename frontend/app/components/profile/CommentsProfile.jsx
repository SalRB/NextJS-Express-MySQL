import Link from "next/link"

export function CommentsProfile({ comments }) {
    return (
        <>
            <div className="commentsProfileContainer">

                {comments
                    ? <>
                        {comments.map(comment => {
                            return (
                                <div className="comment" key={comment.id}>
                                    <div className="user">
                                        <Link href={`/books/${comment.book_id}`} className="pointer">Commented in: {comment.title} </Link>
                                    </div>
                                    <div className="date">
                                        <span>{comment.created_at.split("T")[0]}</span>
                                    </div>
                                    <div className="content">
                                        <div>{comment.content}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                    : <span>Be the first to write a comment</span>
                }


            </div>
        </>
    )
}