import { useState } from "react";

export function BookForm({ formData, updateUserEntry, deleteEntry, updateFavorite, bookInfo }) {

    const [liked, setLiked] = useState(formData.favorited);

    const toggleLike = (book, newState) => {
        setLiked(newState);
        updateFavorite(book, newState);
    }

    return (
        <>
            <div className="state">
                <label htmlFor="state">State</label>
                <select name="state" id="state" defaultValue={formData.state_name} onChange={e => updateUserEntry({ state: e.target.value })}>
                    <option value="Reading">Reading</option>
                    <option value="Plan to read">Plan to read</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div className="score">
                <label htmlFor="review">Score</label>
                <input type="number" name="review" id="review" defaultValue={formData.review} onBlur={e => updateUserEntry({ review: e.target.value })} />
                <input type="text" className="fakeInput" value={"/10"} disabled />
            </div>
            <div className="pages">
                <label htmlFor="progress">Pages</label>
                <input type="number" name="progress" id="progress" defaultValue={formData.progress} onBlur={e => updateUserEntry({ progress: e.target.value })} />
                <input type="text" className="fakeInput" value={"/" + bookInfo.volumeInfo.pageCount} disabled />
            </div>
            <div className="favorite">
                {
                    liked
                        ? <img className="pointer" src={"/filledHeart.png"} alt="Fav" onClick={() => { toggleLike(formData.book_id, false) }} />
                        : <img className="pointer" src={"/voidHeart.png"} alt="Unfav" onClick={() => { toggleLike(formData.book_id, true) }} />
                }
            </div>
            <div className="delete">
                <span className="pointer textAsButton" onClick={() => { deleteEntry() }}>Delete entry</span>
            </div>

        </>
    )
}