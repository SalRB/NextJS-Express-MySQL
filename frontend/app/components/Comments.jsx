import Link from "next/link"

export function Comments({ comments, createComment, session }) {
    return (
        <>
            <div className="commentsContainer">
                <div className="createCommentContainer">

                    {createComment
                        ? session?.user
                            ? <>
                                <div className="label">
                                    <label className="commentLabel" htmlFor="commentForm">Comment</label>
                                </div>
                                <div className="textarea">
                                    <textarea name="commentForm" id="commentForm" cols="120" rows="5" placeholder="comment"></textarea>
                                </div>
                                <div className="button">
                                    <button className="button" type="button" onClick={() => { createComment(document.querySelector('#commentForm').value) }}>Submit</button>
                                </div>
                            </>
                            : <div className="loginAlert"><Link href="/login">Login to be able to comment</Link></div>
                        : <></>
                    }

                </div>
                {console.log(comments)}

                {comments
                    ? <>
                        {comments.map(comment => {
                            return (
                                <div className="comment" key={comment.id}>
                                    <div className="user">
                                        <Link href={`/profile/${comment.user_id}`} className="pointer">{comment.username} </Link>
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