import Link from "next/link"

export function Comments({ comments, createComment, session }) {
    return (
        <>
            <br />

            {comments
                ? <>
                    {comments.map(comment => {
                        return (
                            <div key={comment.id}>
                                <Link href={`/profile/${comment.id}`} className="pointer">{comment.username} </Link>
                                <span>{comment.created_at.split("T")[0]}</span>
                                <div>{comment.content}</div>
                            </div>
                        )
                    })}
                </>
                : <span>Be the first to write a comment</span>
            }

            <br />
            <br />
            {createComment
                ? session?.user
                    ? <>
                        <textarea name="commentForm" id="commentForm" cols="90" rows="7" placeholder="comment"></textarea>
                        <br />
                        <button type="button" onClick={() => { createComment(document.querySelector('#commentForm').value) }}>Submit</button>
                    </>
                    : <span>Login to be able to comment</span>
                : <></>
            }
        </>
    )
}